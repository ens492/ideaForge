
import React, { createContext, useContext, useState, useEffect } from "react";
import { Stage, STAGES, UserProgress, UserSubmission, AIFeedback } from "@/types";

// Define the context state and functions
type AppContextType = {
  progress: UserProgress;
  currentStage: Stage;
  setCurrentStage: (stage: Stage) => void;
  isStageCompleted: (stage: Stage) => boolean;
  isStageAccessible: (stage: Stage) => boolean;
  updateSubmission: (stage: Stage, submission: Partial<UserSubmission>) => void;
  submitForFeedback: (stage: Stage) => Promise<AIFeedback | null>;
  completeStage: (stage: Stage) => void;
};

// Create the context with default values
const AppContext = createContext<AppContextType>({
  progress: {
    currentStage: 'understand',
    submissions: {
      understand: null,
      observe: null,
      define: null,
      ideate: null,
      prototype: null,
      test: null,
      reflect: null
    },
    completedStages: []
  },
  currentStage: 'understand',
  setCurrentStage: () => {},
  isStageCompleted: () => false,
  isStageAccessible: () => false,
  updateSubmission: () => {},
  submitForFeedback: async () => null,
  completeStage: () => {}
});

// Custom hook for using the app context
export const useAppContext = () => useContext(AppContext);

// The provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state
  const [progress, setProgress] = useState<UserProgress>(() => {
    // Try to load from localStorage
    const savedProgress = localStorage.getItem('userProgress');
    if (savedProgress) {
      return JSON.parse(savedProgress);
    }
    
    // Default initial state
    return {
      currentStage: 'understand',
      submissions: {
        understand: null,
        observe: null,
        define: null,
        ideate: null,
        prototype: null,
        test: null,
        reflect: null
      },
      completedStages: []
    };
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userProgress', JSON.stringify(progress));
  }, [progress]);

  // Set the current active stage
  const setCurrentStage = (stage: Stage) => {
    setProgress(prev => ({ ...prev, currentStage: stage }));
  };

  // Check if a stage is completed
  const isStageCompleted = (stage: Stage): boolean => {
    return progress.completedStages.includes(stage);
  };

  // Check if a stage is accessible (either completed or the next available)
  const isStageAccessible = (stage: Stage): boolean => {
    if (isStageCompleted(stage)) return true;
    
    const stageIndex = STAGES.indexOf(stage);
    const prevStage = stageIndex > 0 ? STAGES[stageIndex - 1] : null;
    
    // First stage is always accessible
    if (stageIndex === 0) return true;
    
    // Otherwise, the previous stage must be completed
    return prevStage ? isStageCompleted(prevStage) : false;
  };

  // Update submission data for a specific stage
  const updateSubmission = (stage: Stage, submission: Partial<UserSubmission>) => {
    setProgress(prev => ({
      ...prev,
      submissions: {
        ...prev.submissions,
        [stage]: {
          ...(prev.submissions[stage] || { stageId: stage, answers: {}, completed: false }),
          ...submission
        }
      }
    }));
  };

  // Submit for AI feedback
  const submitForFeedback = async (stage: Stage): Promise<AIFeedback | null> => {
    const submission = progress.submissions[stage];
    
    if (!submission) return null;
    
    try {
      // Import dynamically to avoid circular dependencies
      const { generateAIFeedback } = await import('@/services/aiFeedback');
      
      // Get feedback from our AI service
      const feedbackResult = await generateAIFeedback(stage, submission.answers);
      
      // Create proper AIFeedback object with required fields
      const feedback: AIFeedback = {
        id: `feedback-${Date.now()}`,
        createdAt: new Date(),
        positiveFeedback: feedbackResult.positiveFeedback,
        constructiveFeedback: feedbackResult.constructiveFeedback,
        suggestions: feedbackResult.suggestions,
        approved: feedbackResult.approved
      };
      
      // Update the submission with feedback
      updateSubmission(stage, { 
        feedback,
        completed: feedback.approved 
      });
      
      return feedback;
    } catch (error) {
      console.error("Error getting AI feedback:", error);
      return null;
    }
  };

  // Mark a stage as completed
  const completeStage = (stage: Stage) => {
    setProgress(prev => {
      // Add to completed stages if not already there
      if (!prev.completedStages.includes(stage)) {
        const updatedCompletedStages = [...prev.completedStages, stage];
        
        // Determine next stage
        const currentIndex = STAGES.indexOf(stage);
        const nextStage = currentIndex < STAGES.length - 1 ? STAGES[currentIndex + 1] : stage;
        
        return {
          ...prev,
          completedStages: updatedCompletedStages,
          currentStage: nextStage
        };
      }
      return prev;
    });
  };

  // Context value
  const contextValue: AppContextType = {
    progress,
    currentStage: progress.currentStage,
    setCurrentStage,
    isStageCompleted,
    isStageAccessible,
    updateSubmission,
    submitForFeedback,
    completeStage
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};
