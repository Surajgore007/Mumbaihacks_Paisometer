import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Wallet, Target, TrendingUp, Settings } from "lucide-react";
import { VelocityMeter } from "@/components/VelocityMeter";
import { StatsCard } from "@/components/StatsCard";
import { TransactionList } from "@/components/TransactionList";
import { CashEntryModal } from "@/components/CashEntryModal";
import WarningNudge from "@/components/WarningNudge";
import CriticalNudge from "@/components/CriticalNudge";
import SettingsPanel from "@/components/SettingsPanel";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  time: string;
  category: string;
}

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(true);
  const [showCritical, setShowCritical] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      merchant: "Chai Point",
      amount: 45,
      time: "10:30 AM",
      category: "food",
    },
    {
      id: "2",
      merchant: "Metro Card Recharge",
      amount: 200,
      time: "9:15 AM",
      category: "transport",
    },
    {
      id: "3",
      merchant: "Big Bazaar",
      amount: 350,
      time: "Yesterday",
      category: "shopping",
    },
  ]);

  const handleAddTransaction = (amount: number, category: string) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      merchant: getCategoryName(category),
      amount,
      time: "Just now",
      category,
    };
    setTransactions([newTransaction, ...transactions]);
  };

  const getCategoryName = (category: string) => {
    const names: Record<string, string> = {
      food: "Food & Dining",
      shopping: "Shopping",
      bills: "Bills & Utilities",
      transport: "Transport",
    };
    return names[category] || "Other";
  };

  const velocity = 42;
  const status: "safe" | "warning" | "critical" = velocity < 30 ? "safe" : velocity < 60 ? "warning" : "critical";

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Nudges */}
      <WarningNudge 
        currentVelocity={285} 
        baselineVelocity={142}
        isVisible={showWarning}
      />
      
      <CriticalNudge
        isOpen={showCritical}
        onClose={() => setShowCritical(false)}
        currentVelocity={568}
        baselineVelocity={142}
        projectedExcess={12000}
      />

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          className="mb-8 flex items-start justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-1">PaisoMeter</h1>
            <p className="text-muted-foreground">Track your spending velocity</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSettingsOpen(true)}
            className="hover:bg-card"
          >
            <Settings className="w-5 h-5" />
          </Button>
        </motion.div>

        {/* Velocity Meter */}
        <VelocityMeter velocity={velocity} status={status} />

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <StatsCard
            title="Balance"
            value="₹12.5k"
            icon={Wallet}
            delay={0.1}
          />
          <StatsCard
            title="To Goal"
            value="23d"
            icon={Target}
            subtitle="₹50k target"
            delay={0.2}
          />
          <StatsCard
            title="Today"
            value="₹595"
            icon={TrendingUp}
            delay={0.3}
          />
        </div>

        {/* Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-foreground">Recent</h2>
            <button className="text-sm text-primary hover:text-primary/80 transition-smooth">
              View All
            </button>
          </div>
          <TransactionList transactions={transactions} />
        </motion.div>

        {/* Cash Entry Modal */}
        <CashEntryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddTransaction}
        />
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav onAddClick={() => setIsModalOpen(true)} />
      
      {/* Settings Panel */}
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

export default Dashboard;
