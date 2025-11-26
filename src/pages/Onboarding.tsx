import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Bell, ArrowRight, TrendingUp, Calendar, Check } from "lucide-react";
import { toast } from "sonner";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [income, setIncome] = useState([30000]);
  const [variability, setVariability] = useState<"stable" | "moderate" | "high">("moderate");
  const [goalTitle, setGoalTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [dataConsent, setDataConsent] = useState<"no" | "yes">("no");

  const handleComplete = () => {
    toast.success("Welcome to PaisoMeter!", {
      description: "Your financial tracking starts now.",
    });
    navigate("/dashboard");
  };

  const screens = [
    // Screen 1: Welcome
    <motion.div
      key="welcome"
      className="flex flex-col items-center justify-center min-h-[80vh] text-center px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <motion.div
        className="w-48 h-48 mb-8 relative"
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-indigo/20 to-accent-teal/20 rounded-full blur-3xl" />
        <TrendingUp className="w-full h-full text-accent-indigo relative z-10" strokeWidth={1} />
      </motion.div>

      <motion.h1 
        className="text-4xl font-bold mb-3 text-text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        PaisoMeter
      </motion.h1>
      
      <motion.p 
        className="text-lg text-text-secondary mb-12 max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Track your financial velocity, stay in control
      </motion.p>

      <Button 
        size="lg" 
        className="mb-4 group"
        onClick={() => setCurrentStep(1)}
      >
        Get Started
        <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
      </Button>
      
      <button 
        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => navigate("/dashboard")}
      >
        Skip
      </button>
    </motion.div>,

    // Screen 2: Permission
    <motion.div
      key="permission"
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <motion.div
        animate={{ rotate: [0, -10, 10, -10, 0] }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Bell className="w-24 h-24 text-accent-indigo mb-6" />
      </motion.div>

      <h2 className="text-3xl font-bold mb-4 text-center">Enable Smart Tracking</h2>
      
      <p className="text-text-secondary text-center mb-6 max-w-md">
        PaisoMeter reads your transaction notifications to automatically track spending. 
        All processing happens on your device—your data never leaves your phone.
      </p>

      <div className="bg-card rounded-xl p-6 mb-8 max-w-md w-full">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-lg bg-accent-indigo/10 flex items-center justify-center flex-shrink-0">
            <Bell className="w-6 h-6 text-accent-indigo" />
          </div>
          <div className="text-sm">
            <p className="font-medium mb-1">Example Notification</p>
            <p className="text-text-secondary">Rs 450 debited from A/c XX1234 on 15-Jan</p>
          </div>
        </div>
      </div>

      <Button size="lg" className="mb-4 w-full max-w-md" onClick={() => setCurrentStep(2)}>
        Grant Permission
      </Button>
      
      <button 
        className="text-sm text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => setCurrentStep(2)}
      >
        I'll do this later
      </button>
    </motion.div>,

    // Screen 3: Profile Setup
    <motion.div
      key="profile"
      className="flex flex-col min-h-[80vh] px-6 py-8"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Set Up Your Profile</h2>

      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <label className="text-sm font-medium mb-3 block">Monthly Income Range</label>
          <div className="mb-4">
            <div className="text-3xl font-bold text-accent-indigo mb-2">
              ₹{income[0].toLocaleString("en-IN")}
            </div>
            <Slider 
              value={income} 
              onValueChange={setIncome}
              min={10000}
              max={200000}
              step={5000}
              className="mt-2"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block">Income Variability</label>
          <div className="grid grid-cols-3 gap-3">
            {(["stable", "moderate", "high"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setVariability(level)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  variability === level
                    ? "border-accent-indigo bg-accent-indigo/5"
                    : "border-border hover:border-accent-indigo/50"
                }`}
              >
                <div className="text-sm font-medium capitalize">{level}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium block">Financial Goal</label>
          <Input 
            placeholder="Goal title (e.g., Emergency Fund)" 
            value={goalTitle}
            onChange={(e) => setGoalTitle(e.target.value)}
          />
          <Input 
            placeholder="Target amount" 
            type="number"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <Input 
            type="date" 
            value={goalDate}
            onChange={(e) => setGoalDate(e.target.value)}
          />
        </div>

        <Button size="lg" className="w-full" onClick={() => setCurrentStep(3)}>
          Continue
          <ArrowRight className="ml-2" />
        </Button>
      </div>
    </motion.div>,

    // Screen 4: Privacy Consent
    <motion.div
      key="privacy"
      className="flex flex-col items-center justify-center min-h-[80vh] px-6"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h2 className="text-3xl font-bold mb-4 text-center">Help Improve Parsing—Optional</h2>
      
      <p className="text-text-secondary text-center mb-8 max-w-md">
        To improve PaisoMeter's SMS parsing accuracy, you can optionally share redacted 
        transaction data. All personal information (account numbers, names) is removed 
        before upload. This is completely optional.
      </p>

      <div className="space-y-4 w-full max-w-md mb-8">
        <button
          onClick={() => setDataConsent("yes")}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            dataConsent === "yes"
              ? "border-accent-indigo bg-accent-indigo/5"
              : "border-border hover:border-accent-indigo/50"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
              dataConsent === "yes" ? "border-accent-indigo bg-accent-indigo" : "border-border"
            }`}>
              {dataConsent === "yes" && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <p className="font-medium mb-1">Yes, help improve</p>
              <p className="text-sm text-text-secondary">Share redacted data to improve parsing accuracy</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => setDataConsent("no")}
          className={`w-full p-6 rounded-xl border-2 transition-all text-left ${
            dataConsent === "no"
              ? "border-accent-indigo bg-accent-indigo/5"
              : "border-border hover:border-accent-indigo/50"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 ${
              dataConsent === "no" ? "border-accent-indigo bg-accent-indigo" : "border-border"
            }`}>
              {dataConsent === "no" && <Check className="w-4 h-4 text-white" />}
            </div>
            <div>
              <p className="font-medium mb-1">No, keep local</p>
              <p className="text-sm text-text-secondary">All data stays on your device only</p>
            </div>
          </div>
        </button>
      </div>

      <a href="#" className="text-sm text-accent-indigo hover:underline mb-6">
        Privacy Policy
      </a>

      <Button size="lg" className="w-full max-w-md" onClick={handleComplete}>
        Complete Setup
        <motion.div
          className="ml-2"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
        >
          ✨
        </motion.div>
      </Button>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Dots */}
      <div className="fixed top-8 left-0 right-0 flex justify-center gap-2 z-10">
        {screens.map((_, idx) => (
          <motion.div
            key={idx}
            className={`h-2 rounded-full transition-all ${
              idx === currentStep 
                ? "w-8 bg-accent-indigo" 
                : "w-2 bg-border"
            }`}
            animate={{ width: idx === currentStep ? 32 : 8 }}
          />
        ))}
      </div>

      {/* Back Button */}
      {currentStep > 0 && (
        <button
          onClick={() => setCurrentStep(currentStep - 1)}
          className="fixed top-8 left-6 text-text-secondary hover:text-text-primary transition-colors z-10"
        >
          ← Back
        </button>
      )}

      {/* Screen Content */}
      <AnimatePresence mode="wait">
        {screens[currentStep]}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
