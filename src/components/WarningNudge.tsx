import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface WarningNudgeProps {
  currentVelocity: number;
  baselineVelocity: number;
  isVisible?: boolean;
}

const WarningNudge = ({ currentVelocity, baselineVelocity, isVisible = false }: WarningNudgeProps) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isVisible && !isDismissed) {
      const timer = setTimeout(() => {
        setIsDismissed(true);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isDismissed]);

  const handleViewInsights = () => {
    navigate("/insights");
    setIsDismissed(true);
  };

  const showNudge = isVisible && !isDismissed;

  return (
    <AnimatePresence>
      {showNudge && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed top-4 left-4 right-4 z-50 mx-auto max-w-2xl"
        >
          <div className="bg-warning/10 border-l-4 border-warning rounded-lg shadow-lg p-4 backdrop-blur-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-warning" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-text-primary mb-1">
                  You're spending faster than usual
                </p>
                <p className="text-sm text-text-secondary">
                  ₹{currentVelocity}/hour vs ₹{baselineVelocity} baseline
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleViewInsights}
                  className="whitespace-nowrap"
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  View Insights
                </Button>
                
                <button
                  onClick={() => setIsDismissed(true)}
                  className="w-8 h-8 rounded-full hover:bg-warning/10 flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WarningNudge;
