
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export const Header = () => {
  return (
    <header className="fixed w-full top-0 bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-idea-600">
            IdeaForge
          </Link>
          
          <div className="flex gap-4">
            <Button 
              asChild 
              variant="ghost" 
              className="flex items-center gap-2"
            >
              <Link to="/login">
                <LogIn className="h-4 w-4" /> Log In
              </Link>
            </Button>
            <Button 
              asChild 
              className="bg-idea-600 hover:bg-idea-700 flex items-center gap-2"
            >
              <Link to="/signup">
                <UserPlus className="h-4 w-4" /> Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
