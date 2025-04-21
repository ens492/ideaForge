
import { useAppContext } from "@/context/AppContext";
import { STAGES, STAGE_NAMES, Stage } from "@/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ProgressTracker = () => {
  const { currentStage, isStageCompleted, isStageAccessible, setCurrentStage } = useAppContext();

  return (
    <div className="w-full py-4 overflow-x-auto">
      <div className="min-w-max">
        <ol className="flex items-center">
          {STAGES.map((stage, index) => {
            const isCompleted = isStageCompleted(stage);
            const isActive = currentStage === stage;
            const isAccessible = isStageAccessible(stage);
            const isLast = index === STAGES.length - 1;

            return (
              <li key={stage} className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => isAccessible && setCurrentStage(stage)}
                  disabled={!isAccessible}
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full",
                    isCompleted ? "bg-idea-600 text-white" : isActive ? "border-2 border-idea-600 bg-white text-idea-600" : "bg-white border-2 border-gray-300 text-gray-400",
                    isAccessible && !isActive && !isCompleted ? "hover:border-idea-600 hover:text-idea-600 cursor-pointer" : !isAccessible ? "cursor-not-allowed opacity-50" : "",
                    "transition-all duration-200"
                  )}
                  aria-current={isActive ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </button>

                <div className="ml-2 mr-8 min-w-max">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      isActive || isCompleted
                        ? "text-idea-600"
                        : "text-gray-500"
                    )}
                  >
                    {STAGE_NAMES[stage]}
                  </p>
                </div>

                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-12 top-5 -z-10 h-0.5 w-8 sm:w-16 md:w-24 lg:w-32",
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
  );
};
