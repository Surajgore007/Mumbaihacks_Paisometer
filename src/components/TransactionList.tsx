import { motion, AnimatePresence } from "framer-motion";
import { Coffee, ShoppingBag, Smartphone, Zap } from "lucide-react";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  time: string;
  category: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const categoryIcons: Record<string, any> = {
  food: Coffee,
  shopping: ShoppingBag,
  bills: Zap,
  transport: Smartphone,
};

const categoryColors: Record<string, string> = {
  food: "bg-accent/20 text-accent",
  shopping: "bg-primary/20 text-primary",
  bills: "bg-warning/20 text-warning",
  transport: "bg-success/20 text-success",
};

export const TransactionList = ({ transactions }: TransactionListProps) => {
  if (transactions.length === 0) {
    return (
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <Coffee className="w-12 h-12 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <p className="text-muted-foreground">No transactions yet</p>
        <p className="text-sm text-muted-foreground mt-1">Tap + to add your first expense</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence mode="popLayout">
        {transactions.map((transaction, index) => {
          const Icon = categoryIcons[transaction.category] || Coffee;
          const colorClass = categoryColors[transaction.category] || "bg-muted text-foreground";

          return (
            <motion.div
              key={transaction.id}
              className="bg-card rounded-xl p-4 shadow-neumorphic-sm flex items-center justify-between hover:shadow-neumorphic transition-smooth"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              layout
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${colorClass} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>
                <div>
                  <div className="font-medium text-foreground">{transaction.merchant}</div>
                  <div className="text-sm text-muted-foreground">{transaction.time}</div>
                </div>
              </div>
              <motion.div
                className="text-lg font-bold text-foreground"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 + 0.1 }}
              >
                ₹{transaction.amount}
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};
