"""Random Forest sales prediction model — train, predict, and feature importance."""

from typing import Any

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

FEATURE_COLUMNS = [
    "tv_advertising_spend",
    "social_media_spend",
    "influencer_marketing_spend",
    "target_audience_size",
    "platform_type",
    "region",
]

TARGET_COLUMN = "sales_revenue"


class SalesPredictor:
    """Wraps dataset encoding, Random Forest training, and inference."""

    def __init__(self) -> None:
        self.model: RandomForestRegressor | None = None
        self.platform_encoder = LabelEncoder()
        self.region_encoder = LabelEncoder()
        self.metrics: dict[str, float] = {}
        self.feature_importance: list[dict[str, Any]] = []
        self.is_trained = False

    def _encode_df(self, df: pd.DataFrame, fit: bool = False) -> pd.DataFrame:
        encoded = df.copy()
        if fit:
            encoded["platform_type"] = self.platform_encoder.fit_transform(
                encoded["platform_type"]
            )
            encoded["region"] = self.region_encoder.fit_transform(encoded["region"])
        else:
            encoded["platform_type"] = self._safe_transform(
                self.platform_encoder, encoded["platform_type"]
            )
            encoded["region"] = self._safe_transform(
                self.region_encoder, encoded["region"]
            )
        return encoded

    @staticmethod
    def _safe_transform(encoder: LabelEncoder, series: pd.Series) -> np.ndarray:
        mapping = {cls: idx for idx, cls in enumerate(encoder.classes_)}
        default = 0
        return series.map(lambda x: mapping.get(x, default)).astype(int).values

    def train(self, df: pd.DataFrame) -> dict[str, Any]:
        """Train Random Forest and return accuracy-style metrics."""
        encoded = self._encode_df(df[FEATURE_COLUMNS + [TARGET_COLUMN]], fit=True)
        X = encoded[FEATURE_COLUMNS]
        y = encoded[TARGET_COLUMN]

        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42
        )

        self.model = RandomForestRegressor(
            n_estimators=120,
            max_depth=14,
            min_samples_leaf=2,
            random_state=42,
            n_jobs=-1,
        )
        self.model.fit(X_train, y_train)

        y_pred = self.model.predict(X_test)
        r2 = float(r2_score(y_test, y_pred))
        mae = float(mean_absolute_error(y_test, y_pred))
        accuracy_pct = max(0.0, min(100.0, r2 * 100))

        self.metrics = {
            "r2_score": round(r2, 4),
            "mae": round(mae, 2),
            "accuracy_percent": round(accuracy_pct, 2),
            "train_samples": int(len(X_train)),
            "test_samples": int(len(X_test)),
        }

        labels = [
            "TV Advertising",
            "Social Media",
            "Influencer Marketing",
            "Audience Size",
            "Platform Type",
            "Region",
        ]
        importances = self.model.feature_importances_
        self.feature_importance = [
            {"name": labels[i], "value": round(float(importances[i]), 4)}
            for i in range(len(labels))
        ]
        self.feature_importance.sort(key=lambda x: x["value"], reverse=True)
        self.is_trained = True

        return {
            "metrics": self.metrics,
            "feature_importance": self.feature_importance,
            "message": "Model trained successfully with Random Forest Regressor.",
        }

    def predict(self, payload: dict[str, Any]) -> dict[str, Any]:
        """Predict sales revenue from marketing inputs."""
        if not self.is_trained or self.model is None:
            raise RuntimeError("Model is not trained yet. Call /api/train first.")

        row = pd.DataFrame(
            [
                {
                    "tv_advertising_spend": float(payload["tv_advertising_spend"]),
                    "social_media_spend": float(payload["social_media_spend"]),
                    "influencer_marketing_spend": float(
                        payload["influencer_marketing_spend"]
                    ),
                    "target_audience_size": int(payload["target_audience_size"]),
                    "platform_type": str(payload["platform_type"]),
                    "region": str(payload["region"]),
                }
            ]
        )
        encoded = self._encode_df(row, fit=False)
        X = encoded[FEATURE_COLUMNS]
        prediction = float(self.model.predict(X)[0])

        # Confidence from tree agreement (lower spread = higher confidence)
        tree_preds = np.array([t.predict(X)[0] for t in self.model.estimators_])
        std = float(np.std(tree_preds))
        mean_pred = float(np.mean(tree_preds))
        relative_std = std / (mean_pred + 1e-6)
        confidence = max(55.0, min(98.0, 100.0 - relative_std * 120))

        total_spend = (
            float(payload["tv_advertising_spend"])
            + float(payload["social_media_spend"])
            + float(payload["influencer_marketing_spend"])
        )
        roi = (prediction / (total_spend + 1)) * 100 if total_spend > 0 else 0

        return {
            "predicted_sales_revenue": round(prediction, 2),
            "confidence_score": round(confidence, 2),
            "estimated_roi_percent": round(roi, 2),
            "total_marketing_spend": round(total_spend, 2),
        }
