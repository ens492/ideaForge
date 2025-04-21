import { useAppContext } from "@/context/AppContext";
import { STAGES, STAGE_NAMES, Stage } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { WelcomeCard } from "./WelcomeCard";
import { Check, ArrowRight, Clock } from "lucide-react";

export const Dashboard = () => {
  const { progress, setCurrentStage, isStageCompleted, isStageAccessible } = useAppContext();
  
  // Handle navigation to specific stage
  const handleStageClick = (stage: Stage) => {
    if (isStageAccessible(stage)) {
      setCurrentStage(stage);
    }
  };
  
  // Calculate overall progress
  const totalStages = STAGES.length;
  const completedStages = progress.completedStages.length;
  const progressPercentage = (completedStages / totalStages) * 100;
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Welcome or Progress Summary */}
        <div className="md:col-span-2">
          <WelcomeCard />
        </div>
        
        {/* Progress Overview */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Progress</CardTitle>
              <CardDescription>
                {completedStages} of {totalStages} stages completed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={progressPercentage} className="h-2 mb-4" />
              
              <div className="mt-4">
                <Button 
                  onClick={() => setCurrentStage(progress.currentStage)}
                  className="w-full bg-idea-600 hover:bg-idea-700"
                >
                  Continue from {STAGE_NAMES[progress.currentStage]}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Stages Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const isCompleted = isStageCompleted(stage);
          const isAccessible = isStageAccessible(stage);
          const isCurrent = progress.currentStage === stage;
          
          return (
            <Card 
              key={stage} 
              className={`
                ${isCompleted ? 'border-green-200 bg-green-50' : 
                  isCurrent ? 'border-idea-200 bg-idea-50' : 
                  isAccessible ? 'border-gray-200 hover:border-idea-200' : 
                  'border-gray-200 opacity-70'}
                transition-all cursor-pointer
              `}
              onClick={() => handleStageClick(stage)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  {isCompleted ? (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <Check className="mr-1 h-3 w-3" /> Completed
                    </span>
                  ) : isCurrent ? (
                    <span className="inline-flex items-center rounded-full bg-idea-100 px-2.5 py-0.5 text-xs font-medium text-idea-800">
                      <Clock className="mr-1 h-3 w-3" /> In Progress
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      {isAccessible ? 'Available' : 'Locked'}
                    </span>
                  )}
                </div>
                <CardTitle className="text-lg">{STAGE_NAMES[stage]}</CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <Button 
                  onClick={() => isAccessible && setCurrentStage(stage)}
                  disabled={!isAccessible}
                  variant={isCompleted ? "outline" : "default"}
                  className={isCompleted ? "border-green-200 text-green-800 hover:bg-green-100" : 
                    isCurrent ? "bg-idea-600 hover:bg-idea-700" : ""}
                >
                  {isCompleted ? 'Review' : isCurrent ? 'Continue' : 'Start'} 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
