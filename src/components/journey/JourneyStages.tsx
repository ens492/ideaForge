
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { STAGES, STAGE_NAMES, STAGE_DESCRIPTIONS, Stage } from "@/types";
import { format } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Lock, ArrowDown, ArrowUp, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

interface JourneyStagesProps {
  selectedStage: Stage;
  setSelectedStage: (stage: Stage) => void;
}

export const JourneyStages = ({ selectedStage, setSelectedStage }: JourneyStagesProps) => {
  const { progress, isStageCompleted, isStageAccessible } = useAppContext();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Stage Details</CardTitle>
        <CardDescription>View your submitted answers and feedback for each stage</CardDescription>
      </CardHeader>
      <CardContent className="pb-6">
        <Accordion
          type="single"
          defaultValue={selectedStage}
          value={selectedStage}
          onValueChange={(value) => setSelectedStage(value as Stage)}
          className="w-full"
          collapsible
        >
          {STAGES.map((stage) => {
            const isCompleted = isStageCompleted(stage);
            const isAccessible = isStageAccessible(stage);
            const stageSubmission = progress.submissions[stage];
            
            return (
              <AccordionItem 
                key={stage}
                value={stage}
                disabled={!isAccessible}
                className={cn(
                  "border rounded-lg mb-4 overflow-hidden",
                  isCompleted ? "border-green-200" : 
                    progress.currentStage === stage ? "border-idea-200" : 
                    "border-gray-200",
                  !isAccessible && "opacity-60"
                )}
              >
                <AccordionTrigger className="px-4 py-3 hover:no-underline">
                  <div className="flex items-center">
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full mr-3",
                      isCompleted ? "bg-green-100 text-green-600" : 
                        progress.currentStage === stage ? "bg-idea-100 text-idea-600" : 
                        isAccessible ? "bg-gray-100 text-gray-500" : 
                        "bg-gray-100 text-gray-400"
                    )}>
                      {isCompleted ? (
                        <Check className="h-4 w-4" />
                      ) : !isAccessible ? (
                        <Lock className="h-4 w-4" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className="text-left">
                      <h3 className="font-medium">{STAGE_NAMES[stage]}</h3>
                      <p className="text-sm text-muted-foreground">{STAGE_DESCRIPTIONS[stage]}</p>
                    </div>
                    
                    {isCompleted && (
                      <Badge variant="outline" className="ml-auto mr-2 bg-green-50 text-green-600 border-green-200">
                        Completed
                      </Badge>
                    )}
                    
                    {progress.currentStage === stage && !isCompleted && (
                      <Badge variant="outline" className="ml-auto mr-2 bg-idea-50 text-idea-600 border-idea-200">
                        In Progress
                      </Badge>
                    )}
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-4 pb-4">
                  {!stageSubmission ? (
                    <div className="py-6 text-center">
                      <p className="text-gray-500">No submissions yet for this stage.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {/* Submission date */}
                      {stageSubmission.completed && (
                        <div className="text-sm text-gray-500">
                          <span className="font-medium">Completed on:</span>{" "}
                          {/* In a real app, this would use the actual submission timestamp */}
                          {format(new Date(), "MMMM d, yyyy")}
                        </div>
                      )}
                      
                      {/* User answers */}
                      <div>
                        <h4 className="text-sm font-medium mb-2">Your Responses</h4>
                        <div className="space-y-3">
                          {Object.entries(stageSubmission.answers).map(([questionId, answer]) => (
                            <div key={questionId} className="bg-gray-50 p-3 rounded-md">
                              <p className="text-sm font-medium mb-1">
                                {/* This would ideally reference the actual question text */}
                                Question {questionId}
                              </p>
                              <p className="text-sm">{answer}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* AI Feedback */}
                      {stageSubmission.feedback && (
                        <div>
                          <Collapsible className="w-full">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">AI Feedback</h4>
                              <CollapsibleTrigger className="flex items-center text-sm text-idea-600">
                                <span className="mr-1">View Feedback</span>
                                <ArrowDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                              </CollapsibleTrigger>
                            </div>
                            
                            <CollapsibleContent className="mt-2">
                              <div className="space-y-3">
                                <div className="bg-green-50 p-3 rounded-md">
                                  <p className="text-sm font-medium text-green-700 mb-1">Positive Feedback</p>
                                  <p className="text-sm">{stageSubmission.feedback.positiveFeedback}</p>
                                </div>
                                
                                <div className="bg-amber-50 p-3 rounded-md">
                                  <p className="text-sm font-medium text-amber-700 mb-1">Constructive Feedback</p>
                                  <p className="text-sm">{stageSubmission.feedback.constructiveFeedback}</p>
                                </div>
                                
                                {stageSubmission.feedback.suggestions.length > 0 && (
                                  <div>
                                    <p className="text-sm font-medium mb-2">Suggested Resources</p>
                                    <div className="space-y-2">
                                      {stageSubmission.feedback.suggestions.map(resource => (
                                        <a
                                          key={resource.id}
                                          href={resource.url}
                                          className="flex items-start p-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <FileText className="h-5 w-5 text-idea-500 mr-2 mt-0.5" />
                                          <div>
                                            <p className="text-sm font-medium">{resource.title}</p>
                                            <p className="text-xs text-gray-500">{resource.description}</p>
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </CollapsibleContent>
                          </Collapsible>
                        </div>
                      )}
                      
                      {/* Tasks completed */}
                      {stageSubmission.completedTasks && stageSubmission.completedTasks.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-2">Completed Tasks</h4>
                          <ul className="space-y-1">
                            {stageSubmission.completedTasks.map(taskId => (
                              <li key={taskId} className="flex items-center text-sm">
                                <Check className="h-4 w-4 text-green-600 mr-2" />
                                {/* This would reference the actual task title in a real app */}
                                <span>Task {taskId}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
};
