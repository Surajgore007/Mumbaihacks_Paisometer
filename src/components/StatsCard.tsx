import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  delay?: number;
}

export const StatsCard = ({ title, value, icon: Icon, subtitle, delay = 0 }: StatsCardProps) => {
  return (
    <motion.div
      className="bg-card rounded-2xl p-6 shadow-neumorphic transition-smooth hover:shadow-neumorphic-lg hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" strokeWidth={2} />
        </div>
      </div>
      
      <div className="space-y-1">
        <div className="text-sm text-muted-foreground font-normal">{title}</div>
        <motion.div
          className="text-3xl font-bold text-foreground"
          key={value}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {value}
        </motion.div>
        {subtitle && (
          <div className="text-xs text-muted-foreground mt-1">{subtitle}</div>
        )}
      </div>
    </motion.div>
  );
};
