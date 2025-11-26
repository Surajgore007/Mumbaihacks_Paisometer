import { motion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";

interface VelocityMeterProps {
  velocity: number;
  status: "safe" | "warning" | "critical";
}

export const VelocityMeter = ({ velocity, status }: VelocityMeterProps) => {
  const statusConfig = {
    safe: {
      color: "hsl(var(--success))",
      gradient: ["hsl(var(--success))", "hsl(var(--accent))"],
    },
    warning: {
      color: "hsl(var(--warning))",
      gradient: ["hsl(var(--warning))", "hsl(var(--destructive))"],
    },
    critical: {
      color: "hsl(var(--critical))",
      gradient: ["hsl(var(--critical))", "hsl(var(--destructive))"],
    },
  };

  const config = statusConfig[status];
  const percentage = Math.min(velocity / 100, 1) * 100;

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <motion.div
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <svg width="240" height="240" viewBox="0 0 240 240">
          <defs>
            <linearGradient id={`gradient-${status}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: config.gradient[0] }} />
              <stop offset="100%" style={{ stopColor: config.gradient[1] }} />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="12"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="120"
            cy="120"
            r="100"
            fill="none"
            stroke={`url(#gradient-${status})`}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={628}
            initial={{ strokeDashoffset: 628 }}
            animate={{ strokeDashoffset: 628 - (628 * percentage) / 100 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            transform="rotate(-90 120 120)"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-5xl font-bold"
            key={velocity}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
          >
            ₹{velocity}
          </motion.div>
          <div className="text-sm text-muted-foreground mt-1">per hour</div>
          <motion.div
            className="flex items-center gap-1 mt-2"
            animate={status === "critical" ? { opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {velocity > 50 ? (
              <TrendingUp className="w-4 h-4 text-critical" />
            ) : (
              <TrendingDown className="w-4 h-4 text-success" />
            )}
            <span className="text-xs font-medium" style={{ color: config.color }}>
              {status.toUpperCase()}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
