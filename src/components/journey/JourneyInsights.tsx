
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { Lightbulb } from "lucide-react";

export const JourneyInsights = () => {
  const { progress } = useAppContext();
  const completedCount = progress.completedStages.length;
  
  // Only show insights after completing some stages
  if (completedCount < 2) {
    return null;
  }
  
  // Determine which milestone insights to show
  const showFirstMilestone = completedCount >= 2;
  const showSecondMilestone = completedCount >= 4;
  const showThirdMilestone = completedCount >= 6;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reflection Insights</CardTitle>
        <CardDescription>Key patterns and evolution in your innovation journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {showFirstMilestone && (
            <AccordionItem value="milestone-1">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Initial Problem Understanding</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Your initial research and problem definition show a strong focus on user needs.
                    The problem space you've identified has potential for significant impact.
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Patterns</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>You've identified clear stakeholder needs</li>
                      <li>Your research approach is thorough and methodical</li>
                      <li>The problem statement has evolved to be more specific</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Evolution</h4>
                    <p className="text-sm">
                      You started with a broad problem area but have successfully narrowed it down
                      to a specific user need that can be addressed through innovation.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {showSecondMilestone && (
            <AccordionItem value="milestone-2">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Solution Development Progress</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Your ideation process has produced several promising concepts. The feedback 
                    from the AI has helped refine these into a more focused solution direction.
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Patterns</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Your ideas show strong alignment with user needs</li>
                      <li>There's a good balance between innovation and feasibility</li>
                      <li>You've incorporated feedback effectively in refining concepts</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Evolution</h4>
                    <p className="text-sm">
                      Your solution has evolved from multiple disconnected ideas into a cohesive
                      concept that addresses the core problem in a novel way.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
          
          {showThirdMilestone && (
            <AccordionItem value="milestone-3">
              <AccordionTrigger>
                <div className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-amber-500" />
                  <span>Final Innovation Journey</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <p className="text-sm">
                    Congratulations on nearly completing your innovation journey! You've
                    successfully moved from problem identification to a tested solution.
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Key Achievements</h4>
                    <ul className="list-disc pl-5 text-sm space-y-1">
                      <li>Developed a comprehensive understanding of the problem space</li>
                      <li>Created and refined a novel solution concept</li>
                      <li>Validated your solution with testing and feedback</li>
                      <li>Developed a clear implementation path forward</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-1">Overall Journey</h4>
                    <p className="text-sm">
                      Your approach throughout this journey shows strong design thinking skills.
                      You've consistently focused on user needs while maintaining feasibility
                      and innovation in your solution development.
                    </p>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </CardContent>
    </Card>
  );
};
