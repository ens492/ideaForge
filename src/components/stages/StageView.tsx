
import React from "react";
import { Stage } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { StageContent } from "./StageContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock } from "lucide-react";

type StageViewProps = {
  stage: Stage;
};

export const StageView: React.FC<StageViewProps> = ({ stage }) => {
  const { isStageAccessible, isStageCompleted } = useAppContext();
  const accessible = isStageAccessible(stage);
  const completed = isStageCompleted(stage);

  if (!accessible) {
    return (
      <Card className="mt-8 max-w-3xl mx-auto border-dashed">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Lock className="h-12 w-12 text-gray-400" />
          </div>
          <CardTitle className="text-xl text-gray-500">
            This stage is currently locked
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-gray-500">
          <p>Complete the previous stages to unlock this content.</p>
        </CardContent>
      </Card>
    );
  }

  if (completed) {
    return (
      <Card className="mt-8 max-w-3xl mx-auto">
        <CardHeader className="text-center bg-idea-50 border-b">
          <CardTitle className="text-idea-700">
            You have completed this stage
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-6">
          <p className="text-gray-600 mb-4">
            Great job! You've successfully completed this stage of your innovation journey.
          </p>
          <p className="text-gray-600">
            You can review your submissions and feedback using the navigation menu,
            or continue to the next stage in your journey.
          </p>
        </CardContent>
      </Card>
    );
  }

  return <StageContent stage={stage} />;
};
