import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, ShoppingBag, Smartphone, Zap, Check } from "lucide-react";

interface CashEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, category: string) => void;
}

const categories = [
  { id: "food", name: "Food", icon: Coffee, color: "bg-accent/20 text-accent" },
  { id: "shopping", name: "Shopping", icon: ShoppingBag, color: "bg-primary/20 text-primary" },
  { id: "bills", name: "Bills", icon: Zap, color: "bg-warning/20 text-warning" },
  { id: "transport", name: "Transport", icon: Smartphone, color: "bg-success/20 text-success" },
];

const presets = [100, 500, 1000];

export const CashEntryModal = ({ isOpen, onClose, onSubmit }: CashEntryModalProps) => {
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNumberClick = (num: string) => {
    if (amount.length < 8) {
      setAmount(amount + num);
    }
  };

  const handleBackspace = () => {
    setAmount(amount.slice(0, -1));
  };

  const handlePreset = (preset: number) => {
    setAmount(preset.toString());
  };

  const handleSubmit = () => {
    if (amount && selectedCategory) {
      setIsSuccess(true);
      setTimeout(() => {
        onSubmit(parseFloat(amount), selectedCategory);
        setAmount("");
        setSelectedCategory("");
        setIsSuccess(false);
        onClose();
      }, 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/20 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-background rounded-t-3xl w-full max-w-md shadow-neumorphic-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Add Expense</h2>
                <button
                  onClick={onClose}
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-smooth"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Amount Display */}
              <motion.div
                className="mb-6 text-center"
                key={amount}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
              >
                <div className="text-5xl font-bold text-foreground min-h-[60px] flex items-center justify-center">
                  ₹{amount || "0"}
                </div>
              </motion.div>

              {/* Presets */}
              <div className="flex gap-2 mb-6">
                {presets.map((preset) => (
                  <motion.button
                    key={preset}
                    onClick={() => handlePreset(preset)}
                    className="flex-1 py-2 px-4 rounded-xl bg-muted text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-smooth"
                    whileTap={{ scale: 0.95 }}
                  >
                    ₹{preset}
                  </motion.button>
                ))}
              </div>

              {/* Categories */}
              <div className="mb-6">
                <div className="text-sm font-medium mb-3 text-muted-foreground">Category</div>
                <div className="grid grid-cols-4 gap-3">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-smooth ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-neumorphic"
                            : `${category.color} hover:shadow-neumorphic-sm`
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon className="w-6 h-6" strokeWidth={2} />
                        <span className="text-xs font-medium">{category.name}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Keypad */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <motion.button
                    key={num}
                    onClick={() => handleNumberClick(num.toString())}
                    className="h-16 rounded-xl bg-card shadow-neumorphic-sm text-xl font-medium hover:shadow-neumorphic transition-smooth"
                    whileTap={{ scale: 0.95 }}
                  >
                    {num}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => handleNumberClick(".")}
                  className="h-16 rounded-xl bg-card shadow-neumorphic-sm text-xl font-medium hover:shadow-neumorphic transition-smooth"
                  whileTap={{ scale: 0.95 }}
                >
                  .
                </motion.button>
                <motion.button
                  onClick={() => handleNumberClick("0")}
                  className="h-16 rounded-xl bg-card shadow-neumorphic-sm text-xl font-medium hover:shadow-neumorphic transition-smooth"
                  whileTap={{ scale: 0.95 }}
                >
                  0
                </motion.button>
                <motion.button
                  onClick={handleBackspace}
                  className="h-16 rounded-xl bg-card shadow-neumorphic-sm text-xl font-medium hover:shadow-neumorphic transition-smooth"
                  whileTap={{ scale: 0.95 }}
                >
                  ←
                </motion.button>
              </div>

              {/* Submit Button */}
              <motion.button
                onClick={handleSubmit}
                disabled={!amount || !selectedCategory || isSuccess}
                className="w-full h-14 rounded-xl bg-primary text-primary-foreground font-medium shadow-neumorphic hover:shadow-neumorphic-lg transition-smooth disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                whileTap={{ scale: 0.98 }}
              >
                <AnimatePresence mode="wait">
                  {isSuccess ? (
                    <motion.div
                      key="success"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      <span>Added!</span>
                    </motion.div>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      Add Transaction
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
