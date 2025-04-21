
import { Stage, StageContent } from "@/types";

// Sample content for each stage of the Design Thinking and Lean Startup journey
export const stageContent: Record<Stage, StageContent> = {
  understand: {
    title: "Understand the Problem Space",
    description: "In this stage, you'll gain a deeper understanding of the problem space and context in which you'll be working. This foundational knowledge will inform all subsequent steps of your innovation journey.",
    videoUrl: "https://www.youtube.com/embed/d8qYf1FuHDg",
    articles: [
      {
        id: "article-1",
        title: "Introduction to Design Thinking",
        description: "Learn the basics of the Design Thinking methodology and why it matters.",
        url: "#",
        type: "article"
      },
      {
        id: "article-2",
        title: "Problem Framing Guide",
        description: "How to properly identify and frame problems to be solved.",
        url: "#",
        type: "pdf"
      }
    ],
    reflectionQuestions: [
      {
        id: "understand-q1",
        question: "What specific problem area are you interested in exploring?",
        placeholder: "Describe the problem space that interests you...",
        type: "textarea",
        required: true
      },
      {
        id: "understand-q2",
        question: "Why is this problem important to solve?",
        placeholder: "Explain the significance of this problem...",
        type: "textarea",
        required: true
      },
      {
        id: "understand-q3",
        question: "What are your initial hypotheses about this problem?",
        placeholder: "List your initial assumptions...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "understand-task1",
        title: "Research the problem space",
        description: "Spend at least 2 hours researching existing information about your problem space. Look for academic papers, articles, news, and existing solutions.",
        required: true
      },
      {
        id: "understand-task2",
        title: "Identify key stakeholders",
        description: "List all the people or groups who are affected by this problem or would be affected by potential solutions.",
        required: true
      }
    ]
  },
  
  observe: {
    title: "Observe and Empathize with Users",
    description: "This stage focuses on building empathy with the people affected by the problem. You'll collect data through observations, interviews, and other research methods to understand user needs and pain points.",
    videoUrl: "https://www.youtube.com/embed/EpYgQM4ZZmY",
    articles: [
      {
        id: "article-3",
        title: "Effective User Interview Techniques",
        description: "How to conduct interviews that reveal valuable insights.",
        url: "#",
        type: "article"
      },
      {
        id: "article-4",
        title: "Empathy Mapping Template",
        description: "A template to organize your observations about users.",
        url: "#",
        type: "template"
      }
    ],
    reflectionQuestions: [
      {
        id: "observe-q1",
        question: "Who are the key users or stakeholders affected by this problem?",
        placeholder: "Describe your primary user groups...",
        type: "textarea",
        required: true
      },
      {
        id: "observe-q2",
        question: "What methods did you use to collect data about your users?",
        placeholder: "Describe your research methods...",
        type: "textarea",
        required: true
      },
      {
        id: "observe-q3",
        question: "What key insights did you gain about your users' needs and pain points?",
        placeholder: "List your most important findings...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "observe-task1",
        title: "Conduct user interviews",
        description: "Interview at least 5 potential users or stakeholders to understand their experiences, needs, and frustrations.",
        required: true
      },
      {
        id: "observe-task2",
        title: "Create an empathy map",
        description: "Organize your observations into an empathy map that captures what users say, do, think, and feel.",
        required: true
      }
    ]
  },
  
  define: {
    title: "Define Point of View",
    description: "In this stage, you'll synthesize your research findings into a clear problem statement or 'Point of View' (POV) that will guide your solution development.",
    videoUrl: "https://www.youtube.com/embed/sDQdx4ETx-w",
    articles: [
      {
        id: "article-5",
        title: "Crafting a Strong Problem Statement",
        description: "How to write a problem statement that drives innovation.",
        url: "#",
        type: "article"
      },
      {
        id: "article-6",
        title: "From Research to Insights",
        description: "Methods for synthesizing research data into actionable insights.",
        url: "#",
        type: "pdf"
      }
    ],
    reflectionQuestions: [
      {
        id: "define-q1",
        question: "What is your problem statement? (Format: [User] needs to [user's need] because [insight])",
        placeholder: "Write your problem statement...",
        type: "textarea",
        required: true
      },
      {
        id: "define-q2",
        question: "How does this problem statement reflect the needs and insights you discovered?",
        placeholder: "Explain how your problem statement connects to your research...",
        type: "textarea",
        required: true
      },
      {
        id: "define-q3",
        question: "What constraints or requirements must any solution address?",
        placeholder: "List key constraints and requirements...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "define-task1",
        title: "Analyze research findings",
        description: "Review all the data you've collected and identify patterns, tensions, and surprises.",
        required: true
      },
      {
        id: "define-task2",
        title: "Create user personas",
        description: "Develop 1-2 personas that represent your key user groups and their needs.",
        required: true
      }
    ]
  },
  
  ideate: {
    title: "Ideate Solutions",
    description: "Now that you have a clear problem statement, it's time to generate a wide range of potential solutions. This stage focuses on creative thinking and divergent ideation.",
    videoUrl: "https://www.youtube.com/embed/Q0bCnl6Y-ro",
    articles: [
      {
        id: "article-7",
        title: "Effective Brainstorming Techniques",
        description: "Methods to generate more and better ideas.",
        url: "#",
        type: "article"
      },
      {
        id: "article-8",
        title: "From Ideas to Concepts",
        description: "How to develop raw ideas into robust solution concepts.",
        url: "#",
        type: "pdf"
      }
    ],
    reflectionQuestions: [
      {
        id: "ideate-q1",
        question: "What ideation methods did you use and why?",
        placeholder: "Describe your ideation process...",
        type: "textarea",
        required: true
      },
      {
        id: "ideate-q2",
        question: "Present your top 3 solution ideas.",
        placeholder: "Describe each solution idea in detail...",
        type: "textarea",
        required: true
      },
      {
        id: "ideate-q3",
        question: "How did you select your final solution concept to prototype?",
        placeholder: "Explain your selection criteria and process...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "ideate-task1",
        title: "Conduct a brainstorming session",
        description: "Generate at least 20 possible solution ideas without judging or filtering initially.",
        required: true
      },
      {
        id: "ideate-task2",
        title: "Develop solution concepts",
        description: "Select and develop 3-5 promising ideas into more detailed solution concepts.",
        required: true
      }
    ]
  },
  
  prototype: {
    title: "Build Prototypes",
    description: "This stage focuses on creating simple, low-fidelity representations of your solution to make your ideas tangible and testable. This is where you'll start the Build-Measure-Learn loop of Lean Startup.",
    videoUrl: "https://www.youtube.com/embed/LxSWotvWQBs",
    articles: [
      {
        id: "article-9",
        title: "Rapid Prototyping Methods",
        description: "How to create quick, effective prototypes for testing.",
        url: "#",
        type: "article"
      },
      {
        id: "article-10",
        title: "The Build-Measure-Learn Loop",
        description: "Understanding the core of the Lean Startup methodology.",
        url: "#",
        type: "pdf"
      }
    ],
    reflectionQuestions: [
      {
        id: "prototype-q1",
        question: "What type of prototype did you create and why?",
        placeholder: "Describe your prototype and your approach...",
        type: "textarea",
        required: true
      },
      {
        id: "prototype-q2",
        question: "What is your Minimum Viable Product (MVP) concept?",
        placeholder: "Define what your MVP would include...",
        type: "textarea",
        required: true
      },
      {
        id: "prototype-q3",
        question: "What are the key hypotheses you want to test with your prototype?",
        placeholder: "List the assumptions you need to validate...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "prototype-task1",
        title: "Create a low-fidelity prototype",
        description: "Build a simple representation of your solution using available materials (paper, digital tools, etc.).",
        required: true
      },
      {
        id: "prototype-task2",
        title: "Design test scenarios",
        description: "Plan specific scenarios or tasks that users will perform with your prototype during testing.",
        required: true
      }
    ]
  },
  
  test: {
    title: "Test with Users",
    description: "In this stage, you'll validate your prototype with real users, collect feedback, and iterate based on what you learn. This completes the Build-Measure-Learn loop and may require multiple cycles.",
    videoUrl: "https://www.youtube.com/embed/IZ3xI6DtuOY",
    articles: [
      {
        id: "article-11",
        title: "User Testing Best Practices",
        description: "How to conduct effective user tests that generate valuable insights.",
        url: "#",
        type: "article"
      },
      {
        id: "article-12",
        title: "Iterative Design Process",
        description: "How to use testing feedback to improve your design.",
        url: "#",
        type: "pdf"
      }
    ],
    reflectionQuestions: [
      {
        id: "test-q1",
        question: "How did you test your prototype and with whom?",
        placeholder: "Describe your testing process and participants...",
        type: "textarea",
        required: true
      },
      {
        id: "test-q2",
        question: "What were the key findings from your testing?",
        placeholder: "Summarize what worked, what didn't, and why...",
        type: "textarea",
        required: true
      },
      {
        id: "test-q3",
        question: "How did you iterate your solution based on feedback?",
        placeholder: "Describe the changes you made and your reasoning...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "test-task1",
        title: "Conduct user testing",
        description: "Test your prototype with at least 5 representative users, taking notes on their feedback and behaviors.",
        required: true
      },
      {
        id: "test-task2",
        title: "Analyze test results",
        description: "Review testing data to identify patterns and key insights for improvement.",
        required: true
      },
      {
        id: "test-task3",
        title: "Iterate your prototype",
        description: "Make improvements to your prototype based on testing insights.",
        required: true
      }
    ]
  },
  
  reflect: {
    title: "Reflect and Plan Next Steps",
    description: "In this final stage, you'll review your entire innovation journey, synthesize key learnings, and plan your path forward to bring your solution to reality.",
    videoUrl: "https://www.youtube.com/embed/ncwm61LP7vw",
    articles: [
      {
        id: "article-13",
        title: "From Prototype to Product",
        description: "Steps to transform your validated prototype into a real product.",
        url: "#",
        type: "article"
      },
      {
        id: "article-14",
        title: "Business Model Canvas",
        description: "A template for defining your business model.",
        url: "#",
        type: "template"
      }
    ],
    reflectionQuestions: [
      {
        id: "reflect-q1",
        question: "What are the most important insights you gained throughout this process?",
        placeholder: "Summarize your key learnings...",
        type: "textarea",
        required: true
      },
      {
        id: "reflect-q2",
        question: "How has your understanding of the problem and solution evolved?",
        placeholder: "Describe how your thinking has changed...",
        type: "textarea",
        required: true
      },
      {
        id: "reflect-q3",
        question: "What are your next steps to develop and implement your solution?",
        placeholder: "Outline your action plan moving forward...",
        type: "textarea",
        required: true
      },
      {
        id: "reflect-q4",
        question: "What is your refined business model or value proposition?",
        placeholder: "Describe your business model...",
        type: "textarea",
        required: true
      }
    ],
    tasks: [
      {
        id: "reflect-task1",
        title: "Complete a business model canvas",
        description: "Define the key components of your business model using the Business Model Canvas framework.",
        required: true
      },
      {
        id: "reflect-task2",
        title: "Create an implementation roadmap",
        description: "Develop a timeline with key milestones for developing and launching your solution.",
        required: true
      }
    ]
  }
};
