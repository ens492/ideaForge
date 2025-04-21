
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { STAGES, STAGE_NAMES, STAGE_DESCRIPTIONS, Stage } from "@/types";
import { Progress } from "@/components/ui/progress";
import { Check, Lock, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyProgressProps {
  progressPercentage: number;
  selectedStage: Stage;
  setSelectedStage: (stage: Stage) => void;
}

export const JourneyProgress = ({ 
  progressPercentage,
  selectedStage,
  setSelectedStage 
}: JourneyProgressProps) => {
  const { isStageCompleted, isStageAccessible, currentStage } = useAppContext();
  
  return (
    <div className="space-y-6">
      {/* Overall progress */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm font-medium">Overall Progress</span>
          <span className="text-sm font-medium">{progressPercentage}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      {/* Stages progress tracker */}
      <div className="w-full pb-2 overflow-x-auto">
        <div className="min-w-max">
          <ol className="flex items-center">
            {STAGES.map((stage, index) => {
              const isCompleted = isStageCompleted(stage);
              const isActive = currentStage === stage;
              const isAccessible = isStageAccessible(stage);
              const isSelected = selectedStage === stage;
              const isLast = index === STAGES.length - 1;

              return (
                <li key={stage} className="relative flex flex-col items-center">
                  <button
                    type="button"
                    onClick={() => isAccessible && setSelectedStage(stage)}
                    disabled={!isAccessible}
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full mb-2",
                      isCompleted ? "bg-idea-600 text-white" : 
                        isActive ? "border-2 border-idea-600 bg-white text-idea-600" : 
                        "bg-white border-2 border-gray-300 text-gray-400",
                      isSelected && !isCompleted ? "ring-2 ring-idea-200 ring-offset-2" : "",
                      isAccessible && !isActive && !isCompleted ? "hover:border-idea-600 hover:text-idea-600 cursor-pointer" : 
                        !isAccessible ? "cursor-not-allowed" : "",
                      "transition-all duration-200"
                    )}
                    aria-current={isActive ? "step" : undefined}
                  >
                    {isCompleted ? (
                      <Check className="h-6 w-6" />
                    ) : !isAccessible ? (
                      <Lock className="h-5 w-5" />
                    ) : isActive ? (
                      <Clock className="h-5 w-5" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </button>

                  <div className="min-w-max text-center">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        isSelected || isActive
                          ? "text-idea-600"
                          : isCompleted
                          ? "text-idea-500"
                          : "text-gray-500"
                      )}
                    >
                      {STAGE_NAMES[stage]}
                    </p>
                  </div>

                  {!isLast && (
                    <div
                      className={cn(
                        "absolute left-16 top-6 -z-10 h-0.5 w-12 sm:w-24",
                        isCompleted ? "bg-idea-600" : "bg-gray-300"
                      )}
                    />
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
