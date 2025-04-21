
import { AIFeedback, ResourceItem, Stage } from "@/types";

// This is a simulated AI feedback service
// In a real application, this would connect to an API that uses GPT-4 or another LLM

// Sample feedback responses for different stages
const stageFeedbackTemplates: Record<Stage, {
  positive: string[];
  constructive: string[];
  resources: ResourceItem[];
}> = {
  understand: {
    positive: [
      "You've done an excellent job identifying a clear problem area with significant impact potential.",
      "Your explanation of why this problem matters shows deep consideration of stakeholder needs.",
      "I appreciate how you've approached this problem with both empathy and analytical thinking."
    ],
    constructive: [
      "Consider expanding on how this problem affects different stakeholders specifically.",
      "Your initial hypotheses could benefit from more validation with existing research.",
      "Try to quantify the impact of this problem more specifically if possible."
    ],
    resources: [
      {
        id: "res-und-1",
        title: "Problem Space Mapping Guide",
        description: "A comprehensive guide to mapping problem spaces in innovation",
        url: "#",
        type: "article"
      },
      {
        id: "res-und-2",
        title: "Impact Assessment Framework",
        description: "Tools for quantifying the impact of problems and solutions",
        url: "#",
        type: "template"
      }
    ]
  },
  
  observe: {
    positive: [
      "Your research methodology shows excellent attention to diverse data collection methods.",
      "The insights you've gathered reveal meaningful patterns about user needs.",
      "I'm impressed by how you've synthesized observations into actionable findings."
    ],
    constructive: [
      "Consider expanding your user research to include more diverse user segments.",
      "Your observations could benefit from more quantitative data to complement the qualitative insights.",
      "Try to identify more unexpected findings or tensions in your research."
    ],
    resources: [
      {
        id: "res-obs-1",
        title: "User Research Field Guide",
        description: "Comprehensive methods for gathering user insights",
        url: "#",
        type: "pdf"
      },
      {
        id: "res-obs-2",
        title: "Empathy Mapping Workshop",
        description: "Interactive workshop for creating effective empathy maps",
        url: "#",
        type: "video"
      }
    ]
  },
  
  define: {
    positive: [
      "Your problem statement is clear, specific, and focused on user needs.",
      "You've done a great job connecting your research insights to your problem definition.",
      "The constraints you've identified show realistic understanding of the implementation context."
    ],
    constructive: [
      "Your problem statement could be more specific about which user needs are most critical.",
      "Consider framing your problem statement to highlight more tension or opportunity.",
      "Try refining your problem statement to be more actionable for the ideation phase."
    ],
    resources: [
      {
        id: "res-def-1",
        title: "Problem Statement Reframing Guide",
        description: "Techniques for crafting powerful problem statements",
        url: "#",
        type: "article"
      },
      {
        id: "res-def-2",
        title: "Point of View Statement Workshop",
        description: "Interactive workshop for creating effective POV statements",
        url: "#",
        type: "video"
      }
    ]
  },
  
  ideate: {
    positive: [
      "Your ideation process shows excellent creative thinking and diverse approaches.",
      "The solution concepts you've developed address key aspects of the problem in novel ways.",
      "Your selection criteria demonstrate thoughtful consideration of feasibility and impact."
    ],
    constructive: [
      "Consider exploring more radical or unexpected solution directions.",
      "Your ideas could benefit from more cross-domain inspiration.",
      "Try evaluating your solutions against more specific criteria related to user needs."
    ],
    resources: [
      {
        id: "res-ide-1",
        title: "Creative Ideation Techniques",
        description: "Advanced methods to generate breakthrough ideas",
        url: "#",
        type: "article"
      },
      {
        id: "res-ide-2",
        title: "Concept Selection Framework",
        description: "Systematic approach to evaluating solution concepts",
        url: "#",
        type: "template"
      }
    ]
  },
  
  prototype: {
    positive: [
      "Your prototype approach is well-matched to the solution concept and testing needs.",
      "The MVP definition shows good focus on core value with minimal development.",
      "Your testing hypotheses are specific and clearly connected to your solution's value proposition."
    ],
    constructive: [
      "Consider creating multiple prototypes that explore different aspects of your solution.",
      "Your MVP might be too feature-rich; consider further simplifying to test core assumptions.",
      "Try to make your hypotheses more measurable for clearer validation criteria."
    ],
    resources: [
      {
        id: "res-pro-1",
        title: "Rapid Prototyping Techniques",
        description: "Methods for faster, more effective prototyping",
        url: "#",
        type: "video"
      },
      {
        id: "res-pro-2",
        title: "Lean MVP Development Guide",
        description: "Principles and practices for minimal viable products",
        url: "#",
        type: "article"
      }
    ]
  },
  
  test: {
    positive: [
      "Your testing approach shows excellent attention to real user interactions.",
      "The findings you've gathered provide clear direction for improvements.",
      "Your iteration process demonstrates good application of testing insights."
    ],
    constructive: [
      "Consider testing with a more diverse group of users to get broader feedback.",
      "Your testing scenarios might benefit from more open-ended exploration.",
      "Try to identify patterns across different test participants for more robust insights."
    ],
    resources: [
      {
        id: "res-tes-1",
        title: "User Testing Playbook",
        description: "Comprehensive guide to effective user testing",
        url: "#",
        type: "pdf"
      },
      {
        id: "res-tes-2",
        title: "Iterative Design Process",
        description: "Framework for continuous improvement through testing",
        url: "#",
        type: "article"
      }
    ]
  },
  
  reflect: {
    positive: [
      "Your reflections demonstrate excellent learning and growth throughout the process.",
      "The business model you've developed shows good alignment with user needs and market realities.",
      "Your implementation plan is realistic and well-structured for moving forward."
    ],
    constructive: [
      "Consider more specific metrics for tracking success in your next steps.",
      "Your business model might benefit from more consideration of long-term sustainability.",
      "Try to be more specific about resources and support needed for implementation."
    ],
    resources: [
      {
        id: "res-ref-1",
        title: "From Prototype to Product Launch",
        description: "Guide for transitioning from validated prototype to market",
        url: "#",
        type: "article"
      },
      {
        id: "res-ref-2",
        title: "Innovation Metrics Framework",
        description: "KPIs and measurement approaches for innovative products",
        url: "#",
        type: "template"
      }
    ]
  }
};

// Helper to get a random item from an array
const getRandomItem = <T,>(items: T[]): T => {
  return items[Math.floor(Math.random() * items.length)];
};

// Simulated AI feedback generation
export const generateAIFeedback = async (stage: Stage, answers: Record<string, string>): Promise<AIFeedback> => {
  // Simulate a delay to mimic API call
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const template = stageFeedbackTemplates[stage];
  
  // In a real application, we would send the answers to an LLM API
  // and receive personalized feedback
  const feedback: AIFeedback = {
    id: `feedback-${Date.now()}`,
    createdAt: new Date(),
    positiveFeedback: getRandomItem(template.positive),
    constructiveFeedback: getRandomItem(template.constructive),
    suggestions: template.resources.slice(0, 1 + Math.floor(Math.random() * 2)), // 1 or 2 resources
    approved: true // In a real app, this would be based on the quality of answers
  };
  
  return feedback;
};
