import { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Calendar, ShoppingBag, Coffee, Bus, Home } from "lucide-react";
import BottomNav from "@/components/BottomNav";
import { CashEntryModal } from "@/components/CashEntryModal";

const Insights = () => {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "3m" | "year">("month");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data
  const spendingData = [
    { date: "Mon", amount: 450 },
    { date: "Tue", amount: 680 },
    { date: "Wed", amount: 320 },
    { date: "Thu", amount: 890 },
    { date: "Fri", amount: 1200 },
    { date: "Sat", amount: 760 },
    { date: "Sun", amount: 420 },
  ];

  const categoryData = [
    { name: "Food", value: 3500, color: "#3F4B6E", icon: Coffee },
    { name: "Transport", value: 1200, color: "#4A6F70", icon: Bus },
    { name: "Shopping", value: 2800, color: "#D47A6A", icon: ShoppingBag },
    { name: "Bills", value: 1500, color: "#6B7280", icon: Home },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">₹{payload[0].value.toLocaleString("en-IN")}</p>
          <p className="text-xs text-text-secondary">{payload[0].payload.date}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur-sm border-b border-border z-10 px-6 py-4">
        <h1 className="text-2xl font-bold">Insights</h1>
      </div>

      <div className="px-6 py-6 max-w-2xl mx-auto space-y-8">
        {/* Time Range Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {(["week", "month", "3m", "year"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                timeRange === range
                  ? "bg-accent-indigo text-white shadow-sm"
                  : "bg-card text-text-secondary hover:text-text-primary hover:bg-card/80"
              }`}
            >
              {range === "3m" ? "3 Months" : range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="text-sm font-medium text-text-secondary mb-6">Daily Spending Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={spendingData}>
              <defs>
                <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3F4B6E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3F4B6E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `₹${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#3F4B6E"
                strokeWidth={2}
                fill="url(#colorAmount)"
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Key Insights Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 hover:shadow-soft-hover transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Most Spent On</p>
                  <p className="text-2xl font-bold">Food</p>
                </div>
                <Coffee className="w-8 h-8 text-accent-coral" />
              </div>
              <p className="text-lg font-semibold text-accent-indigo">₹3,500</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-success">
                <TrendingDown className="w-4 h-4" />
                <span>12% less than last week</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 hover:shadow-soft-hover transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Busiest Day</p>
                  <p className="text-2xl font-bold">Friday</p>
                </div>
                <Calendar className="w-8 h-8 text-accent-teal" />
              </div>
              <p className="text-lg font-semibold text-accent-indigo">8 transactions</p>
              <div className="flex items-center gap-1 mt-2 text-sm text-warning">
                <TrendingUp className="w-4 h-4" />
                <span>Spending peak detected</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 hover:shadow-soft-hover transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-text-secondary mb-1">Average Daily</p>
                  <p className="text-2xl font-bold">₹687</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent-coral" />
              </div>
              <div className="h-8 flex items-end gap-1">
                {[40, 60, 45, 80, 100, 70, 50].map((height, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-accent-indigo/30 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Category Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-2xl p-6 shadow-soft"
        >
          <h3 className="text-sm font-medium text-text-secondary mb-6">Category Breakdown</h3>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <ResponsiveContainer width="100%" height={200} className="md:w-1/2">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  animationDuration={500}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="flex-1 space-y-4 w-full">
              {categoryData.map((category, idx) => {
                const Icon = category.icon;
                const total = categoryData.reduce((sum, cat) => sum + cat.value, 0);
                const percentage = ((category.value / total) * 100).toFixed(0);

                return (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-text-secondary">{percentage}%</p>
                      </div>
                    </div>
                    <p className="font-semibold">₹{category.value.toLocaleString("en-IN")}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom Navigation */}
      <BottomNav onAddClick={() => setIsModalOpen(true)} />
      
      {/* Cash Entry Modal */}
      <CashEntryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={() => {}}
      />
    </div>
  );
};

export default Insights;
