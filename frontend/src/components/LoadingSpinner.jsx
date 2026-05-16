import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

/** Animated loading indicator for async API calls */
export default function LoadingSpinner({ label = "Loading..." }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-3 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Loader2 className="h-10 w-10 animate-spin text-cyan-400" />
      <p className="text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}
