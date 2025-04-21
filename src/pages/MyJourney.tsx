
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppProvider } from "@/context/AppContext";
import { useAppContext } from "@/context/AppContext";
import { JourneyProgress } from "@/components/journey/JourneyProgress";
import { JourneyStages } from "@/components/journey/JourneyStages";
import { JourneyInsights } from "@/components/journey/JourneyInsights";
import { JourneyActions } from "@/components/journey/JourneyActions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

const JourneyView = () => {
  const { progress, currentStage } = useAppContext();
  const [selectedStage, setSelectedStage] = useState(currentStage);
  
  // Calculate overall progress
  const totalStages = 7; // Total number of stages
  const completedCount = progress.completedStages.length;
  const progressPercentage = Math.round((completedCount / totalStages) * 100);
  
  const handleDownloadReport = () => {
    // This would be implemented with a PDF generation library in a real application
    toast.success("Journey report download started", {
      description: "Your innovation journey report is being generated."
    });
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      {/* Header with progress overview */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold text-idea-700">My Innovation Journey</CardTitle>
              <CardDescription className="mt-1">
                Track your progress through the 7 stages of innovation design thinking
              </CardDescription>
            </div>
            <Button onClick={handleDownloadReport} className="ml-auto">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <JourneyProgress 
            progressPercentage={progressPercentage} 
            selectedStage={selectedStage}
            setSelectedStage={setSelectedStage}
          />
        </CardContent>
      </Card>
      
      {/* Stage details */}
      <JourneyStages selectedStage={selectedStage} setSelectedStage={setSelectedStage} />
      
      {/* Reflection insights */}
      <JourneyInsights />
      
      {/* Next actions */}
      <JourneyActions />
    </div>
  );
};

// Main Journey page component with AppProvider
const MyJourney = () => {
  return (
    <AppProvider>
      <MainLayout>
        <JourneyView />
      </MainLayout>
    </AppProvider>
  );
};

export default MyJourney;
