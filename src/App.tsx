/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Home, LayoutGrid, User, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Step = "mobile" | "gmail" | "otp" | "success";

export default function App() {
  const [step, setStep] = useState<Step>("mobile");
  const [mobileNumber, setMobileNumber] = useState("");
  const [gmail, setGmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");

  const handleContinue = () => {
    if (step === "mobile") {
      setStep("gmail");
    } else if (step === "gmail") {
      setStep("otp");
    } else if (step === "otp") {
      if (otp === "201120") {
        setStep("success");
        setError("");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }
  };

  const isButtonDisabled = () => {
    if (step === "mobile") return mobileNumber.length < 10;
    if (step === "gmail") return !gmail.includes("@") || !gmail.includes(".");
    if (step === "otp") return otp.length < 6;
    return false;
  };

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
            <div className="w-16 h-16 bg-sky-50 rounded-full flex items-center justify-center mb-4">
              <Home size={32} className="text-sky-200" />
            </div>
            <p className="text-sky-300 text-sm font-light">Your personalized feed will appear here</p>
          </div>
        );
      case "category":
        return (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold text-sky-400">Categories</h2>
            <div className="flex flex-col gap-2">
              {["Pens", "Notebooks", "Art Supplies", "Office Desk"].map((cat) => (
                <div key={cat} className="p-4 bg-white border border-gray-100 rounded-xl flex justify-between items-center shadow-sm">
                  <span className="font-medium text-gray-700">{cat}</span>
                  <LayoutGrid size={16} className="text-sky-200" />
                </div>
              ))}
            </div>
          </div>
        );
      case "account":
        return (
          <div className="flex flex-col items-center gap-6 mt-4">
            <div className="w-24 h-24 bg-sky-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <User size={48} className="text-sky-400" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">My Profile</h2>
              <p className="text-gray-500 text-sm">{gmail || "user@example.com"}</p>
            </div>
            <div className="w-full flex flex-col gap-2">
              {["My Orders", "Settings", "Help Center"].map((item) => (
                <Button key={item} variant="ghost" className="justify-start text-gray-600 font-normal hover:bg-sky-50 hover:text-sky-600">
                  {item}
                </Button>
              ))}
              <Button variant="ghost" className="justify-start text-red-500 font-normal hover:bg-red-50" onClick={() => setStep("mobile")}>
                Logout
              </Button>
            </div>
          </div>
        );
      case "bag":
        return (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
              <ShoppingBag size={32} className="text-gray-300" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Your bag is empty</h2>
              <p className="text-gray-400 text-sm">Add some stationery items to get started!</p>
            </div>
            <Button className="bg-sky-400 hover:bg-sky-500 rounded-full px-8" onClick={() => setActiveTab("home")}>
              Shop Now
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-0 sm:p-4">
      {/* Mobile Container */}
      <div className="w-full h-screen sm:h-[812px] sm:max-w-[375px] bg-white sm:rounded-[40px] sm:shadow-2xl overflow-hidden flex flex-col relative border-gray-100 sm:border">
        
        {/* Header Section - Very small and in top-left corner */}
        <motion.div 
          layout
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2 left-0 right-0 z-10"
        >
          <div className="flex flex-col">
            <div className="flex items-center justify-between px-4 h-8">
              <motion.div 
                key="brand"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-baseline text-sky-400"
              >
                <span className="font-bold text-sm tracking-tight">Jay</span>
                <div className="flex items-baseline ml-0.5 translate-y-1.5">
                  <span className="font-extralight text-sm tracking-tight">Matadi</span>
                  <span className="font-normal text-[6px] ml-0.5 uppercase tracking-widest opacity-90">station</span>
                </div>
              </motion.div>
              
              {step === "success" && (
                <button 
                  onClick={() => setIsSearching(!isSearching)}
                  className="text-sky-400 hover:text-sky-600 transition-colors p-1"
                >
                  {isSearching ? <X size={18} /> : <Search size={18} />}
                </button>
              )}
            </div>
            {/* Lighter line below header - Full width */}
            <div className="w-full h-[1px] bg-gray-200 mt-1" />
            
            {/* Search input below the line */}
            <AnimatePresence>
              {isSearching && step === "success" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden bg-white px-4 py-2 border-b border-gray-100"
                >
                  <Input 
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search items..."
                    className="h-8 text-xs border-sky-100 focus-visible:ring-sky-400 bg-sky-50/30"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>


        <div className="flex-grow flex flex-col p-8 pt-24">
          <AnimatePresence mode="wait">
            {step !== "success" ? (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex flex-col h-full"
              >
                {/* Welcome Section */}
                <div className="flex flex-col gap-1 text-black mt-4">
                  <h1 className="text-2xl font-semibold tracking-tight">welcome</h1>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step === "mobile" && "Enter your mobile number to start shopping."}
                    {step === "gmail" && "Enter your Gmail start shopping."}
                    {step === "otp" && "Enter your OTP start shopping."}
                  </p>
                </div>

                {/* Input Section */}
                <div className="mt-10 flex-grow">
                  <div className="flex items-center border-b border-gray-100 focus-within:border-orange-500 transition-colors duration-300 pb-2">
                    {step === "mobile" && (
                      <>
                        <span className="text-lg font-medium text-gray-300 mr-2">+91</span>
                        <Input 
                          type="tel" 
                          value={mobileNumber}
                          onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          placeholder="00000 00000" 
                          className="border-none shadow-none focus-visible:ring-0 text-xl p-0 h-auto font-medium placeholder:text-gray-100"
                        />
                      </>
                    )}
                    {step === "gmail" && (
                      <Input 
                        type="email" 
                        value={gmail}
                        onChange={(e) => setGmail(e.target.value)}
                        placeholder="example@gmail.com" 
                        className="border-none shadow-none focus-visible:ring-0 text-xl p-0 h-auto font-medium placeholder:text-gray-100"
                      />
                    )}
                    {step === "otp" && (
                      <Input 
                        type="text" 
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                          setError("");
                        }}
                        placeholder="000000" 
                        className="border-none shadow-none focus-visible:ring-0 text-xl p-0 h-auto font-medium placeholder:text-gray-100 tracking-[0.4em]"
                      />
                    )}
                  </div>
                  {error && <p className="text-red-500 mt-3 text-xs font-medium">{error}</p>}
                </div>

                {/* Footer Action */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="mt-auto pb-6"
                >
                  <Button 
                    onClick={handleContinue}
                    disabled={isButtonDisabled()}
                    className="w-full bg-black text-white hover:bg-gray-900 rounded-full py-6 text-lg font-light tracking-[0.15em] uppercase transition-all duration-300 active:scale-[0.98] disabled:opacity-20 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col h-full overflow-y-auto pb-20"
              >
                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Icons - Only show after success */}
        <AnimatePresence>
          {step === "success" && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 border-t border-gray-300 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center h-16 text-sky-400 relative">
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab("home")}
                  className={`flex-1 flex flex-col justify-center items-center transition-colors h-full cursor-pointer relative ${activeTab === "home" ? "text-sky-600" : "hover:bg-sky-50/50"}`}
                >
                  <Home size={22} strokeWidth={activeTab === "home" ? 2.5 : 2} />
                  {activeTab === "home" && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-sky-600 rounded-full" />
                  )}
                </motion.div>
                <div className="w-[1px] h-8 bg-gray-300" />
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab("category")}
                  className={`flex-1 flex flex-col justify-center items-center transition-colors h-full cursor-pointer relative ${activeTab === "category" ? "text-sky-600" : "hover:bg-sky-50/50"}`}
                >
                  <LayoutGrid size={22} strokeWidth={activeTab === "category" ? 2.5 : 2} />
                  {activeTab === "category" && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-sky-600 rounded-full" />
                  )}
                </motion.div>
                <div className="w-[1px] h-8 bg-gray-300" />
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab("account")}
                  className={`flex-1 flex flex-col justify-center items-center transition-colors h-full cursor-pointer relative ${activeTab === "account" ? "text-sky-600" : "hover:bg-sky-50/50"}`}
                >
                  <User size={22} strokeWidth={activeTab === "account" ? 2.5 : 2} />
                  {activeTab === "account" && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-sky-600 rounded-full" />
                  )}
                </motion.div>
                <div className="w-[1px] h-8 bg-gray-300" />
                <motion.div 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setActiveTab("bag")}
                  className={`flex-1 flex flex-col justify-center items-center transition-colors h-full cursor-pointer relative ${activeTab === "bag" ? "text-sky-600" : "hover:bg-sky-50/50"}`}
                >
                  <ShoppingBag size={22} strokeWidth={activeTab === "bag" ? 2.5 : 2} />
                  {activeTab === "bag" && (
                    <motion.div layoutId="nav-indicator" className="absolute bottom-0 left-1/4 right-1/4 h-[2px] bg-sky-600 rounded-full" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


