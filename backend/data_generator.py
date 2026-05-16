"""Generate a realistic synthetic sales dataset for training and visualization."""

import numpy as np
import pandas as pd

PLATFORMS = ["E-commerce", "Mobile App", "Retail", "Marketplace", "Direct Sales"]
REGIONS = ["North America", "Europe", "Asia Pacific", "Latin America", "Middle East"]


def generate_sales_dataset(n_samples: int = 500, random_state: int = 42) -> pd.DataFrame:
    """Create sales records with advertising spend, audience, platform, region, and revenue."""
    rng = np.random.default_rng(random_state)

    tv_spend = rng.uniform(5_000, 150_000, n_samples)
    social_spend = rng.uniform(3_000, 120_000, n_samples)
    influencer_spend = rng.uniform(2_000, 80_000, n_samples)
    audience_size = rng.integers(10_000, 500_000, n_samples)
    platform = rng.choice(PLATFORMS, n_samples)
    region = rng.choice(REGIONS, n_samples)

    platform_boost = {
        "E-commerce": 1.15,
        "Mobile App": 1.08,
        "Retail": 0.95,
        "Marketplace": 1.05,
        "Direct Sales": 1.02,
    }
    region_boost = {
        "North America": 1.12,
        "Europe": 1.05,
        "Asia Pacific": 1.18,
        "Latin America": 0.92,
        "Middle East": 0.98,
    }

    base_revenue = (
        tv_spend * 0.42
        + social_spend * 0.38
        + influencer_spend * 0.55
        + audience_size * 0.08
    )
    noise = rng.normal(0, base_revenue * 0.06, n_samples)
    sales_revenue = np.maximum(
        base_revenue
        * np.array([platform_boost[p] for p in platform])
        * np.array([region_boost[r] for r in region])
        + noise,
        5_000,
    )

    return pd.DataFrame(
        {
            "tv_advertising_spend": np.round(tv_spend, 2),
            "social_media_spend": np.round(social_spend, 2),
            "influencer_marketing_spend": np.round(influencer_spend, 2),
            "target_audience_size": audience_size,
            "platform_type": platform,
            "region": region,
            "sales_revenue": np.round(sales_revenue, 2),
        }
    )
