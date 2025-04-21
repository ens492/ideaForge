
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const JourneyActions = () => {
  const { currentStage, progress, setCurrentStage } = useAppContext();
  const stageSubmission = progress.submissions[currentStage];
  
  // If the current stage is completed, this would suggest next stage
  const isCurrentStageCompleted = progress.completedStages.includes(currentStage);
  
  // Determine next action guidance based on current stage and completion status
  let actionTitle = "Continue Your Journey";
  let actionDescription = "Complete your current stage to progress in your innovation journey.";
  let actionButtonText = "Continue to Current Stage";
  
  if (isCurrentStageCompleted) {
    actionTitle = "Ready for the Next Step";
    actionDescription = "You've completed your current stage. Move forward to the next challenge!";
    actionButtonText = "Go to Next Stage";
  } else if (stageSubmission && !stageSubmission.completed) {
    actionTitle = "Complete Your Current Stage";
    actionDescription = "You've started this stage but still need to complete it to progress.";
    actionButtonText = "Continue Working";
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Actions</CardTitle>
        <CardDescription>Recommended next steps for your innovation journey</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-4 border border-idea-100 bg-idea-50 rounded-lg">
          <h3 className="font-medium text-idea-800 mb-1">{actionTitle}</h3>
          <p className="text-sm text-idea-600 mb-4">{actionDescription}</p>
          
          <Button 
            onClick={() => {
              // Navigate to current stage view
              const event = new CustomEvent('switchToJourney', { detail: currentStage });
              window.dispatchEvent(event);
            }}
            className="bg-idea-600 hover:bg-idea-700"
          >
            {actionButtonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
