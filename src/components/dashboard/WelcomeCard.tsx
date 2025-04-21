
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

export const WelcomeCard = () => {
  const { setCurrentStage, progress } = useAppContext();
  const hasStarted = progress.completedStages.length > 0 || Object.values(progress.submissions).some(s => s !== null);
  
  return (
    <Card className="border-2 border-idea-100">
      <CardHeader className="bg-gradient-to-r from-idea-50 to-white pb-6">
        <CardTitle className="text-2xl text-idea-800">Welcome to Idea Forge</CardTitle>
        <CardDescription className="text-idea-700 text-base">
          Your AI-guided innovation journey
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">What you'll learn:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-idea-100 p-1 mr-3">
                <span className="h-1.5 w-1.5 rounded-full bg-idea-600"></span>
              </span>
              <span className="text-gray-700">Design Thinking and Lean Startup methodologies</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-idea-100 p-1 mr-3">
                <span className="h-1.5 w-1.5 rounded-full bg-idea-600"></span>
              </span>
              <span className="text-gray-700">How to validate business ideas with real users</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-idea-100 p-1 mr-3">
                <span className="h-1.5 w-1.5 rounded-full bg-idea-600"></span>
              </span>
              <span className="text-gray-700">Systematic approach to uncertainty in innovation</span>
            </li>
            <li className="flex items-start">
              <span className="inline-flex items-center justify-center rounded-full bg-idea-100 p-1 mr-3">
                <span className="h-1.5 w-1.5 rounded-full bg-idea-600"></span>
              </span>
              <span className="text-gray-700">Building a validated business model</span>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end bg-gray-50 border-t pt-4 pb-4">
        <Button 
          onClick={() => setCurrentStage('understand')}
          className="bg-idea-600 hover:bg-idea-700"
        >
          {hasStarted ? 'Continue Your Journey' : 'Start Your Journey'} <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
