
import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlusCircle, MinusCircle, Lightbulb, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";

type IdeaItem = {
  title: string;
  benefit: string;
  uniqueness: string;
  risk: string;
};

type IdeateFormValues = {
  ideas: IdeaItem[];
  selectedIdeaIndex: number;
  needStatement: string;
  approachStatement: string;
  benefitStatement: string;
  competitionStatement: string;
};

export const StageIdeate: React.FC = () => {
  const { progress, updateSubmission, submitForFeedback, completeStage } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    positiveFeedback: string;
    constructiveFeedback: string;
    suggestions: any[];
    approved: boolean;
  } | null>(null);

  // Initialize form with saved values or defaults
  const ideateSubmission = progress.submissions.ideate;
  const savedValues = ideateSubmission?.answers || {};

  const defaultValues: IdeateFormValues = {
    ideas: savedValues.ideas || [{ title: "", benefit: "", uniqueness: "", risk: "" }],
    selectedIdeaIndex: savedValues.selectedIdeaIndex || 0,
    needStatement: savedValues.needStatement || "",
    approachStatement: savedValues.approachStatement || "",
    benefitStatement: savedValues.benefitStatement || "",
    competitionStatement: savedValues.competitionStatement || "",
  };

  const form = useForm<IdeateFormValues>({
    defaultValues,
  });

  const { watch, setValue } = form;
  const ideas = watch("ideas");
  const selectedIdeaIndex = watch("selectedIdeaIndex");

  // Add a new idea form
  const addIdea = () => {
    const currentIdeas = form.getValues("ideas");
    setValue("ideas", [...currentIdeas, { title: "", benefit: "", uniqueness: "", risk: "" }]);
  };

  // Remove an idea form
  const removeIdea = (index: number) => {
    const currentIdeas = form.getValues("ideas");
    if (currentIdeas.length <= 1) return;
    
    const newIdeas = currentIdeas.filter((_, i) => i !== index);
    setValue("ideas", newIdeas);
    
    // Update selected idea index if necessary
    if (index === selectedIdeaIndex) {
      setValue("selectedIdeaIndex", 0);
    } else if (index < selectedIdeaIndex) {
      setValue("selectedIdeaIndex", selectedIdeaIndex - 1);
    }
  };

  // Select an idea for NABC
  const selectIdea = (index: number) => {
    setValue("selectedIdeaIndex", index);
  };

  // Save progress as draft
  const saveDraft = (data: IdeateFormValues) => {
    updateSubmission("ideate", {
      stageId: "ideate",
      answers: data,
      completed: false,
    });
    toast.success("Draft saved successfully!");
  };

  // Submit for feedback
  const handleSubmit = async (data: IdeateFormValues) => {
    // Validate minimum requirements
    if (data.ideas.length < 3) {
      toast.error("Please add at least 3 different solution ideas");
      return;
    }

    // Check if all ideas have content
    const hasEmptyIdeas = data.ideas.some(
      (idea) => !idea.title || !idea.benefit || !idea.uniqueness || !idea.risk
    );
    if (hasEmptyIdeas) {
      toast.error("Please complete all fields for each idea");
      return;
    }

    // Check if NABC framework is completed
    if (!data.needStatement || !data.approachStatement || !data.benefitStatement || !data.competitionStatement) {
      toast.error("Please complete the NABC framework for your selected idea");
      return;
    }

    setIsSubmitting(true);

    // Save the submission
    updateSubmission("ideate", {
      stageId: "ideate",
      answers: data,
      completed: false,
    });

    // Get AI feedback
    try {
      const feedbackResult = await submitForFeedback("ideate");
      
      if (feedbackResult) {
        setFeedback({
          positiveFeedback: feedbackResult.positiveFeedback,
          constructiveFeedback: feedbackResult.constructiveFeedback,
          suggestions: feedbackResult.suggestions,
          approved: feedbackResult.approved,
        });

        if (feedbackResult.approved) {
          toast.success("Great job! You can move to the next stage!");
          completeStage("ideate");
        } else {
          toast.info("Review the feedback and consider revising your submission");
        }
      } else {
        toast.error("Unable to get feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting ideation:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Ideate Solutions</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
          Generate a wide range of creative ideas, evaluate them strategically, and refine your approach.
        </p>
      </div>

      <Tabs defaultValue="ideas" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ideas">Generate Ideas</TabsTrigger>
          <TabsTrigger value="nabc">NABC Framework</TabsTrigger>
        </TabsList>

        <TabsContent value="ideas" className="mt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Your Solution Ideas</h2>
                <Button 
                  type="button" 
                  onClick={addIdea}
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <PlusCircle className="h-4 w-4" /> Add Idea
                </Button>
              </div>

              <div className="space-y-6">
                {ideas.map((idea, index) => (
                  <Card key={index} className={selectedIdeaIndex === index ? "border-idea-500 shadow-md" : ""}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <FormField
                            control={form.control}
                            name={`ideas.${index}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Idea {index + 1}</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Enter your idea title..."
                                    {...field}
                                    className="text-lg font-medium"
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => selectIdea(index)}
                            className={selectedIdeaIndex === index ? "bg-idea-100" : ""}
                          >
                            {selectedIdeaIndex === index ? (
                              <><Check className="h-4 w-4 mr-1" /> Selected</>
                            ) : (
                              "Select for NABC"
                            )}
                          </Button>
                          {ideas.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeIdea(index)}
                            >
                              <MinusCircle className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`ideas.${index}.benefit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Main Benefit</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="What's the primary value this idea delivers?"
                                  {...field}
                                  className="h-24"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`ideas.${index}.uniqueness`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>What Makes It Different</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="How is this different from existing solutions?"
                                  {...field}
                                  className="h-24"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`ideas.${index}.risk`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Potential Weakness or Risk</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="What challenges could this idea face?"
                                  {...field}
                                  className="h-24"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => saveDraft(form.getValues())}
                  className="mr-2"
                >
                  Save Draft
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="nabc" className="mt-6 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>NABC Framework for Your Selected Idea</CardTitle>
                  <CardDescription>
                    {ideas[selectedIdeaIndex]?.title 
                      ? `Developing: ${ideas[selectedIdeaIndex].title}`
                      : "Please select and name an idea first"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="needStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Need</FormLabel>
                        <FormDescription>
                          What is the important customer and market need your idea addresses?
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the specific customer need..."
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="approachStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Approach</FormLabel>
                        <FormDescription>
                          What is your unique approach for addressing this need?
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Explain your solution approach..."
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="benefitStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Benefit</FormLabel>
                        <FormDescription>
                          What are the quantifiable benefits per cost that make your idea valuable?
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the concrete benefits..."
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="competitionStatement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Competition</FormLabel>
                        <FormDescription>
                          How does your approach compare to existing alternatives and their benefits?
                        </FormDescription>
                        <FormControl>
                          <Textarea
                            placeholder="Compare your idea to competitors or alternatives..."
                            {...field}
                            className="min-h-[100px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => saveDraft(form.getValues())}
                  >
                    Save Draft
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit for Feedback"}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>

          {/* Feedback section */}
          {feedback && (
            <Card className="mt-8 border-l-4 border-l-idea-600">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-idea-600" />
                  AI Feedback on Your Ideas
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-green-700 mb-2">What's Working Well</h4>
                  <p className="text-gray-700">{feedback.positiveFeedback}</p>
                </div>
                
                {feedback.constructiveFeedback && (
                  <div>
                    <h4 className="font-medium text-amber-700 mb-2">Suggestions for Improvement</h4>
                    <p className="text-gray-700">{feedback.constructiveFeedback}</p>
                  </div>
                )}

                {feedback.suggestions && feedback.suggestions.length > 0 && (
                  <div>
                    <h4 className="font-medium text-blue-700 mb-2">Resources That Might Help</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                      {feedback.suggestions.map((suggestion, i) => (
                        <Card key={i} className="bg-blue-50">
                          <CardHeader className="py-3 px-4">
                            <CardTitle className="text-sm font-medium">{suggestion.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="py-2 px-4">
                            <p className="text-xs text-gray-600">{suggestion.description}</p>
                          </CardContent>
                          <CardFooter className="py-2 px-4">
                            <a 
                              href={suggestion.url} 
                              className="text-xs text-blue-600 hover:text-blue-800"
                              target="_blank" 
                              rel="noopener noreferrer"
                            >
                              Learn more →
                            </a>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-center">
                    {feedback.approved ? (
                      <div className="flex items-center text-green-700">
                        <Check className="h-5 w-5 mr-2" />
                        <span className="font-medium">Your submission has been approved! You can move to the next stage.</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-700">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span className="font-medium">Please review the feedback above and revise your submission.</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
