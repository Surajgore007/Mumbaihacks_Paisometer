import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Pause, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts";

interface CriticalNudgeProps {
  isOpen: boolean;
  onClose: () => void;
  currentVelocity: number;
  baselineVelocity: number;
  projectedExcess: number;
}

const CriticalNudge = ({
  isOpen,
  onClose,
  currentVelocity,
  baselineVelocity,
  projectedExcess,
}: CriticalNudgeProps) => {
  // Mock projection data
  const projectionData = [
    { day: 1, actual: 2000, projected: 2000, goal: 3000 },
    { day: 2, actual: 3500, projected: 3500, goal: 3000 },
    { day: 3, actual: null, projected: 5200, goal: 3000 },
    { day: 4, actual: null, projected: 6800, goal: 3000 },
    { day: 5, actual: null, projected: 8500, goal: 3000 },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md bg-background rounded-2xl shadow-2xl z-50 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-6 border-b border-border">
              <div className="flex items-start gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-14 h-14 rounded-full bg-critical/20 flex items-center justify-center flex-shrink-0"
                >
                  <AlertCircle className="w-7 h-7 text-critical" />
                </motion.div>
                
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-text-primary mb-1">
                    Critical Spending Velocity!
                  </h2>
                  <p className="text-sm text-text-secondary">
                    ₹{currentVelocity}/hour — {((currentVelocity / baselineVelocity) * 100).toFixed(0)}% above normal
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Alert Message */}
              <div className="bg-critical/10 border border-critical/20 rounded-lg p-4">
                <p className="text-sm">
                  At this rate, you'll <span className="font-bold text-critical">exceed your goal by ₹{projectedExcess.toLocaleString("en-IN")}</span> by the end of the period.
                </p>
              </div>

              {/* What-If Simulation */}
              <div>
                <h3 className="text-sm font-semibold mb-3">Projected vs Goal</h3>
                <div className="bg-card rounded-xl p-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <AreaChart data={projectionData}>
                      <defs>
                        <linearGradient id="colorProjected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#D47A6A" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#D47A6A" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="day" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#6B7280", fontSize: 12 }}
                        tickFormatter={(value) => `₹${value / 1000}k`}
                      />
                      <ReferenceLine 
                        y={3000} 
                        stroke="#4A6F70" 
                        strokeDasharray="3 3" 
                        label={{ value: "Goal", fill: "#4A6F70", fontSize: 12 }}
                      />
                      <Area
                        type="monotone"
                        dataKey="projected"
                        stroke="#D47A6A"
                        strokeWidth={2}
                        fill="url(#colorProjected)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Quick Tips */}
              <div className="bg-accent-indigo/5 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Quick Tips:</p>
                <ul className="text-sm text-text-secondary space-y-1">
                  <li>• Pause auto-tracking for high-spend events</li>
                  <li>• Review recent large transactions</li>
                  <li>• Consider adjusting your budget</li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t border-border space-y-3">
              <Button className="w-full" size="lg">
                <Pause className="w-4 h-4 mr-2" />
                Pause Auto-Tracking
              </Button>
              
              <Button variant="outline" className="w-full" size="lg">
                <TrendingUp className="w-4 h-4 mr-2" />
                See Breakdown
              </Button>
              
              <Button 
                variant="ghost" 
                className="w-full" 
                onClick={onClose}
              >
                Dismiss
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CriticalNudge;
