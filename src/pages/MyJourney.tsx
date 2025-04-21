
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppProvider, useAppContext } from "@/context/AppContext";
import { STAGES, Stage } from "@/types";
import { StageView } from "@/components/stages/StageView";
import { JourneyProgress } from "@/components/journey/JourneyProgress";
import { JourneyStages } from "@/components/journey/JourneyStages";
import { JourneyInsights } from "@/components/journey/JourneyInsights";
import { JourneyActions } from "@/components/journey/JourneyActions";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// The main journey page that shows the user's innovation journey
const MyJourney = () => {
  const { progress, currentStage } = useAppContext();
  const [selectedStage, setSelectedStage] = useState<Stage>(currentStage);
  
  // Calculate overall progress percentage
  const totalStages = STAGES.length;
  const completedStages = progress.completedStages.length;
  const progressPercentage = Math.round((completedStages / totalStages) * 100);

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Progress Tracker */}
        <Card>
          <CardContent className="pt-6">
            <JourneyProgress 
              progressPercentage={progressPercentage}
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
            />
          </CardContent>
        </Card>
        
        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stage Navigator */}
          <div className="lg:col-span-1 space-y-8">
            <JourneyStages 
              selectedStage={selectedStage}
              setSelectedStage={setSelectedStage}
            />
            
            <JourneyInsights />
            
            <JourneyActions />
          </div>
          
          {/* Right Column - Stage Content */}
          <div className="lg:col-span-2">
            <StageView stage={selectedStage} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

// Wrap the component with the AppProvider to ensure context is available
const WrappedMyJourney = () => (
  <AppProvider>
    <MyJourney />
  </AppProvider>
);

export default WrappedMyJourney;
