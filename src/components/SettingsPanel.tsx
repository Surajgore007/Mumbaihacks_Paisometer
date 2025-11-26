import { motion, AnimatePresence } from "framer-motion";
import { X, User, Bell, Database, Download, Moon, Minimize2, Shield, Mail } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  const handleExport = () => {
    toast.success("Data exported successfully", {
      description: "Your transaction data has been downloaded.",
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">Settings</h2>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full hover:bg-card flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Account Section */}
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  Account
                </h3>
                <div className="bg-card rounded-xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent-indigo/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent-indigo" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">User Profile</p>
                    <p className="text-sm text-text-secondary">Monthly income: ₹30,000</p>
                  </div>
                  <Button variant="ghost" size="sm">Edit</Button>
                </div>
              </section>

              {/* Tracking Section */}
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  Tracking
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Bell className="w-5 h-5 text-accent-indigo mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Auto-Tracking</p>
                        <p className="text-sm text-text-secondary">
                          Automatically detect transactions from notifications
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-2 h-2 rounded-full bg-success" />
                          <span className="text-xs text-success">Active</span>
                        </div>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <Database className="w-5 h-5 text-accent-teal mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">Raw Data Upload</p>
                        <p className="text-sm text-text-secondary">
                          Share anonymized data to improve parsing
                        </p>
                      </div>
                    </div>
                    <Switch />
                  </div>
                </div>
              </section>

              {/* Data Section */}
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  Data
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Retention Period</label>
                    <Select defaultValue="90">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">365 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full justify-start gap-2"
                    onClick={handleExport}
                  >
                    <Download className="w-4 h-4" />
                    Export Data
                  </Button>
                </div>
              </section>

              {/* Appearance Section */}
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  Appearance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Moon className="w-5 h-5 text-accent-indigo" />
                      <span className="font-medium">Dark Theme</span>
                    </div>
                    <Switch />
                  </div>

                  <div className="h-px bg-border" />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Minimize2 className="w-5 h-5 text-accent-teal" />
                      <span className="font-medium">Reduce Motion</span>
                    </div>
                    <Switch />
                  </div>
                </div>
              </section>

              {/* About Section */}
              <section>
                <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wide mb-4">
                  About
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-text-secondary">Version 1.0.0</p>
                  
                  <Button variant="ghost" className="w-full justify-start gap-2 px-0">
                    <Shield className="w-4 h-4" />
                    Privacy Policy
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start gap-2 px-0">
                    <Shield className="w-4 h-4" />
                    Terms of Service
                  </Button>
                  
                  <Button variant="ghost" className="w-full justify-start gap-2 px-0">
                    <Mail className="w-4 h-4" />
                    Contact Support
                  </Button>
                </div>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;
