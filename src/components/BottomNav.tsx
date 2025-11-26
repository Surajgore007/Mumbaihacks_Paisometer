import { Home, TrendingUp, Plus } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { motion } from "framer-motion";

interface BottomNavProps {
  onAddClick: () => void;
}

const BottomNav = ({ onAddClick }: BottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-40"
    >
      <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-around">
        <NavLink
          to="/dashboard"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-background/50 transition-colors"
          activeClassName="text-accent-indigo"
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </NavLink>

        <button
          onClick={onAddClick}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-background/50 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-accent-indigo text-white flex items-center justify-center -mt-2 shadow-lg">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-medium">Add</span>
        </button>

        <NavLink
          to="/insights"
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-lg hover:bg-background/50 transition-colors"
          activeClassName="text-accent-indigo"
        >
          <TrendingUp className="w-5 h-5" />
          <span className="text-xs font-medium">Insights</span>
        </NavLink>
      </div>
    </motion.nav>
  );
};

export default BottomNav;
