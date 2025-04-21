
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { Image, FileUp, ChevronDown, ChevronUp, Lightbulb, Target, User, Brain } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ReflectionForm } from "./ReflectionForm";

const educationalConcepts = [
  {
    id: "pov",
    title: "Point-of-View (POV) Statement",
    icon: <Target className="h-5 w-5 text-idea-600" />,
    description: "Synthesizes user research into a focused problem statement.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>User: Who is experiencing the problem</li>
        <li>Need: What they're trying to accomplish</li>
        <li>Insight: Why this matters/the underlying cause</li>
      </ul>
      <p class="mb-2">A good POV statement is:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Human-centered, not technology or product-centered</li>
        <li>Broad enough to allow creative solutions</li>
        <li>Narrow enough to make the challenge manageable</li>
      </ul>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Example:</p>
        <p class="italic">"A busy parent needs a way to prepare nutritious meals quickly because they have limited time between work and family responsibilities."</p>
      </div>
    `
  },
  {
    id: "hmw",
    title: "How Might We (HMW) Questions",
    icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
    description: "Converts needs into actionable problem questions.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Insight reframe: Turning a challenge into an opportunity</li>
        <li>Open-ended format: Invites multiple solution paths</li>
      </ul>
      <p class="mb-2">Tips for good HMW questions:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Not too broad: "How might we solve world hunger?"</li>
        <li>Not too narrow: "How might we make a fork with five tines?"</li>
        <li>Just right: "How might we help people portion their meals better?"</li>
      </ul>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Transform your POV into HMW questions:</p>
        <p class="italic">"How might we help busy parents prepare nutritious meals quickly?"</p>
        <p class="italic">"How might we make nutritious food more accessible for time-constrained families?"</p>
      </div>
    `
  },
  {
    id: "visioncone",
    title: "Vision Cone",
    icon: <Target className="h-5 w-5 text-purple-500" />,
    description: "Helps define and visualize future possibilities for the idea.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Immediate vision (1 year): Concrete, actionable goals</li>
        <li>Mid-term vision (3-5 years): Strategic development</li>
        <li>Long-term vision (10+ years): Aspirational impact</li>
      </ul>
      <p>The vision cone expands from specific, tactical solutions to broader systemic changes as you look further into the future.</p>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Example for a meal solution:</p>
        <p><strong>Immediate:</strong> App for quick, healthy recipes with common ingredients</p>
        <p><strong>Mid-term:</strong> Integrated meal planning, grocery delivery, and preparation system</p>
        <p><strong>Long-term:</strong> Transformed relationship with food preparation in busy households</p>
      </div>
    `
  },
  {
    id: "contextmapping",
    title: "Context Mapping",
    icon: <Brain className="h-5 w-5 text-blue-500" />,
    description: "Helps users uncover the broader context influencing user behavior.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Environmental factors: Physical setting, time, location</li>
        <li>Emotional factors: Feelings, stress, motivations</li>
        <li>Relational factors: Social dynamics, power structures</li>
      </ul>
      <p class="mb-2">Context mapping helps you understand:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>When and where your solution will be used</li>
        <li>What emotional state your user might be in</li>
        <li>Who else might influence the use of your solution</li>
      </ul>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">For the busy parent example:</p>
        <p><strong>Environment:</strong> Small kitchen, evening time constraint, multitasking</p>
        <p><strong>Emotional:</strong> Stressed, tired, guilty about food choices</p>
        <p><strong>Relational:</strong> Children with different preferences, partner with different schedule</p>
      </div>
    `
  },
  {
    id: "persona",
    title: "Persona/User Profile",
    icon: <User className="h-5 w-5 text-green-500" />,
    description: "Refines the understanding of user types and their attributes.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Demographics: Age, occupation, education, etc.</li>
        <li>Goals: What they're trying to achieve</li>
        <li>Frustrations: Pain points and challenges</li>
        <li>Behaviors: Routines, habits, preferences</li>
      </ul>
      <p class="mb-2">A good persona:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Is based on real research, not assumptions</li>
        <li>Represents a pattern of user behavior, not an edge case</li>
        <li>Includes relevant details that inform design decisions</li>
      </ul>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Example:</p>
        <p><strong>Maya, 38, Marketing Manager and mother of two</strong></p>
        <p><strong>Goals:</strong> Provide healthy meals, advance in career, spend quality time with family</p>
        <p><strong>Frustrations:</strong> Time pressure, meal planning, food waste</p>
        <p><strong>Behaviors:</strong> Shops on weekends, meal preps when possible, relies on quick solutions on busy days</p>
      </div>
    `
  },
  {
    id: "customerprofile",
    title: "Customer Profile Canvas",
    icon: <Target className="h-5 w-5 text-orange-500" />,
    description: "Maps motivations, expectations, and jobs-to-be-done.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Jobs to be done: Functional, social, and emotional tasks</li>
        <li>Pains: Frustrations, risks, and obstacles</li>
        <li>Gains: Benefits, outcomes, and aspirations</li>
      </ul>
      <p>The Customer Profile Canvas helps you analyze what your user is trying to accomplish, what's getting in their way, and what success looks like to them.</p>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Example for busy parent:</p>
        <p><strong>Jobs:</strong> Feed family healthy meals, manage time efficiently, teach good eating habits</p>
        <p><strong>Pains:</strong> Lack of time, picky eaters, food waste, guilt over quick unhealthy options</p>
        <p><strong>Gains:</strong> Peace of mind, health benefits, more family time, reduced stress</p>
      </div>
    `
  },
  {
    id: "questionanalysis",
    title: "Question Analysis Builder",
    icon: <Brain className="h-5 w-5 text-teal-500" />,
    description: "Helps users frame their problem in manageable and solvable terms.",
    content: `
      <h3 class="text-lg font-medium">Key Parts</h3>
      <ul class="list-disc pl-5 space-y-1 mt-2 mb-4">
        <li>Question breakdown: Dissecting complex problems</li>
        <li>Insight grouping: Organizing research findings</li>
      </ul>
      <p class="mb-2">How to break down a complex problem:</p>
      <ul class="list-disc pl-5 space-y-1">
        <li>Identify the core problem vs. symptoms</li>
        <li>Group related insights from your research</li>
        <li>Prioritize based on impact and feasibility</li>
        <li>Reframe negative constraints as positive opportunities</li>
      </ul>
      <div class="bg-idea-50 p-3 rounded-md mt-4">
        <p class="font-medium text-idea-700">Example question analysis:</p>
        <p><strong>Core problem:</strong> Time-nutrition tradeoff for busy parents</p>
        <p><strong>Related insights:</strong> Meal planning stress, shopping inefficiency, preparation bottlenecks</p>
        <p><strong>Reframe:</strong> How can meal preparation become an efficient, stress-free part of family routine?</p>
      </div>
    `
  }
];

export const StageDefine = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeTab, setActiveTab] = useState("form");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const { progress, updateSubmission } = useAppContext();
  
  // Get the submission from the context if it exists
  const submission = progress.submissions["define"];
  
  // Initialize form values from existing submission or defaults
  const [formValues, setFormValues] = useState({
    targetUser: submission?.answers?.targetUser || "",
    userNeed: submission?.answers?.userNeed || "",
    barrier: submission?.answers?.barrier || "",
    povStatement: submission?.answers?.povStatement || ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormValues({
      ...formValues,
      [field]: value
    });
    
    // Update submission in context (this will auto-save progress)
    updateSubmission("define", {
      answers: {
        ...submission?.answers,
        [field]: value
      }
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        
        // Store the image in the submission
        updateSubmission("define", {
          answers: {
            ...submission?.answers,
            contextDiagram: result
          }
        });
        
        toast({
          title: "Image uploaded",
          description: "Your context diagram has been saved.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // The full form component with educational material
  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="form" className="flex-1">Define Your Problem</TabsTrigger>
          <TabsTrigger value="learn" className="flex-1">Educational Resources</TabsTrigger>
        </TabsList>
        
        <TabsContent value="form" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Define Your Point of View</CardTitle>
              <CardDescription>
                Synthesize your research insights into a clear problem statement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="targetUser" className="text-base font-medium">
                  Describe your target user in one clear sentence <span className="text-red-500">*</span>
                </label>
                <Input
                  id="targetUser"
                  value={formValues.targetUser}
                  onChange={(e) => handleInputChange("targetUser", e.target.value)}
                  placeholder="e.g., A busy working parent with young children"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="userNeed" className="text-base font-medium">
                  What is this user's biggest need? <span className="text-red-500">*</span>
                </label>
                <Input
                  id="userNeed"
                  value={formValues.userNeed}
                  onChange={(e) => handleInputChange("userNeed", e.target.value)}
                  placeholder="e.g., To prepare nutritious meals quickly and easily"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="barrier" className="text-base font-medium">
                  What's the main barrier keeping them from fulfilling this need? <span className="text-red-500">*</span>
                </label>
                <Input
                  id="barrier"
                  value={formValues.barrier}
                  onChange={(e) => handleInputChange("barrier", e.target.value)}
                  placeholder="e.g., Limited time between work and family responsibilities"
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="povStatement" className="text-base font-medium">
                  Complete the POV template <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  [User] is experiencing [problem] because [cause/insight]
                </p>
                <Textarea
                  id="povStatement"
                  value={formValues.povStatement}
                  onChange={(e) => handleInputChange("povStatement", e.target.value)}
                  placeholder="e.g., A busy working parent is experiencing difficulty providing nutritious meals for their family because they have limited time between work and family responsibilities."
                  className="w-full min-h-24"
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <label htmlFor="contextDiagram" className="text-base font-medium flex items-center">
                  <span>Optional: Upload Context Diagram or Persona Template</span>
                  <Badge variant="outline" className="ml-2">Optional</Badge>
                </label>
                <p className="text-sm text-gray-500 mb-2">
                  You can upload a diagram, sketch, or template to help illustrate your problem context.
                </p>
                
                <div className="flex items-center gap-4">
                  <Button variant="outline" className="flex items-center gap-2" onClick={() => document.getElementById('contextDiagram')?.click()}>
                    <FileUp className="h-4 w-4" />
                    <span>Upload Image</span>
                    <input 
                      id="contextDiagram" 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                    />
                  </Button>
                  
                  {uploadedImage && (
                    <span className="text-sm text-green-600">
                      Image uploaded successfully
                    </span>
                  )}
                </div>
                
                {(uploadedImage || (submission?.answers?.contextDiagram)) && (
                  <div className="mt-4 border rounded-md p-4">
                    <p className="text-sm font-medium mb-2">Uploaded Context Diagram:</p>
                    <img 
                      src={uploadedImage || submission?.answers?.contextDiagram} 
                      alt="Context Diagram" 
                      className="max-w-full h-auto max-h-64 object-contain"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          {/* Use the existing ReflectionForm component for submission and feedback */}
          <div className="mt-8">
            <ReflectionForm 
              stage="define" 
              questions={[
                {
                  id: "targetUser",
                  question: "Describe your target user in one clear sentence",
                  placeholder: "e.g., A busy working parent with young children",
                  type: "text",
                  required: true
                },
                {
                  id: "userNeed",
                  question: "What is this user's biggest need?",
                  placeholder: "e.g., To prepare nutritious meals quickly and easily",
                  type: "text",
                  required: true
                },
                {
                  id: "barrier",
                  question: "What's the main barrier keeping them from fulfilling this need?",
                  placeholder: "e.g., Limited time between work and family responsibilities",
                  type: "text",
                  required: true
                },
                {
                  id: "povStatement",
                  question: "Complete the POV template: [User] is experiencing [problem] because [cause/insight]",
                  placeholder: "e.g., A busy working parent is experiencing difficulty providing nutritious meals for their family because they have limited time between work and family responsibilities.",
                  type: "textarea",
                  required: true
                }
              ]}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="learn" className="pt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {educationalConcepts.map((concept) => (
              <Collapsible key={concept.id} className="border rounded-lg">
                <CollapsibleTrigger className="flex items-center justify-between w-full p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    {concept.icon}
                    <div>
                      <h3 className="font-medium text-left">{concept.title}</h3>
                      <p className="text-sm text-gray-500 text-left">{concept.description}</p>
                    </div>
                  </div>
                  <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 transition-transform ui-open:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div 
                    className="text-sm prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: concept.content }}
                  />
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
