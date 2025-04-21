
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { CalendarCheck, Layers, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentStage } = useAppContext();

  // Function to handle navigation to current stage
  const handleNavigateToCurrentStage = () => {
    // Create and dispatch a custom event to switch to the journey view
    const event = new CustomEvent('switchToJourney', { detail: currentStage });
    window.dispatchEvent(event);
  };

  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Layers className="h-8 w-8 text-idea-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">Idea Forge</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-700"
                onClick={handleNavigateToCurrentStage}
              >
                <CalendarCheck className="mr-2 h-4 w-4" />
                My Journey
              </Button>
              <Button variant="outline" size="sm" className="text-gray-700">
                Resources
              </Button>
              <Button 
                variant="default" 
                size="sm" 
                className="bg-idea-600 hover:bg-idea-700"
                onClick={handleNavigateToCurrentStage}
              >
                Current Stage: {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-idea-500"
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="block pl-3 pr-4 py-2 border-l-4 border-idea-500 text-base font-medium text-idea-700 bg-idea-50"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToCurrentStage();
              setIsMenuOpen(false);
            }}
          >
            My Journey
          </a>
          <a
            href="#"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
          >
            Resources
          </a>
          <a
            href="#"
            className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
            onClick={(e) => {
              e.preventDefault();
              handleNavigateToCurrentStage();
              setIsMenuOpen(false);
            }}
          >
            Current Stage: {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)}
          </a>
        </div>
      </div>
    </div>
  );
};
