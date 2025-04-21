
import React from "react";
import { Navbar } from "./Navbar";
import { ProgressTracker } from "./ProgressTracker";
import { useAppContext } from "@/context/AppContext";

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentStage } = useAppContext();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressTracker />
        <main className="mt-8">{children}</main>
      </div>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 text-sm">
              © 2023 Idea Forge. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 text-sm text-gray-500">
              Integrating Design Thinking and Lean Startup approaches with AI guidance.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
