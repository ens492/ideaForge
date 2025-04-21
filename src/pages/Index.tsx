
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppProvider } from "@/context/AppContext";
import { STAGES, Stage } from "@/types";
import { StageView } from "@/components/stages/StageView";
import { Dashboard } from "@/components/dashboard/Dashboard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppContext } from "@/context/AppContext";

// The main application view that shows either the dashboard or a specific stage
const MainView = () => {
  const { currentStage } = useAppContext();
  const [view, setView] = useState<'dashboard' | 'journey'>('dashboard');
  const [activeStage, setActiveStage] = useState<Stage>(currentStage);

  // When the current stage changes in the context, update our local state
  if (activeStage !== currentStage) {
    setActiveStage(currentStage);
    setView('journey');
  }

  return (
    <div className="space-y-8">
      {/* View Toggle */}
      <div className="flex justify-end">
        <div className="inline-flex rounded-md shadow-sm">
          <button
            type="button"
            onClick={() => setView('dashboard')}
            className={`relative inline-flex items-center rounded-l-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10 ${
              view === 'dashboard'
                ? 'bg-idea-600 text-white hover:bg-idea-700'
                : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
          >
            Dashboard
          </button>
          <button
            type="button"
            onClick={() => setView('journey')}
            className={`relative -ml-px inline-flex items-center rounded-r-md px-3 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 focus:z-10 ${
              view === 'journey'
                ? 'bg-idea-600 text-white hover:bg-idea-700'
                : 'bg-white text-gray-900 hover:bg-gray-50'
            }`}
          >
            Journey
          </button>
        </div>
      </div>

      {/* Dashboard View */}
      {view === 'dashboard' && <Dashboard />}

      {/* Journey View */}
      {view === 'journey' && (
        <Card>
          <CardContent className="p-6">
            <Tabs
              value={activeStage}
              onValueChange={(value) => setActiveStage(value as Stage)}
              className="w-full"
            >
              <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
                {STAGES.map((stage) => (
                  <TabsTrigger key={stage} value={stage} className="capitalize">
                    {stage}
                  </TabsTrigger>
                ))}
              </TabsList>
              {STAGES.map((stage) => (
                <TabsContent key={stage} value={stage}>
                  <StageView stage={stage} />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

// Main Index component with AppProvider
const Index = () => {
  return (
    <AppProvider>
      <MainLayout>
        <MainView />
      </MainLayout>
    </AppProvider>
  );
};

export default Index;
