
// Type definitions for Idea Forge AI Mentor

// User progress stages
export type Stage = 
  | 'understand' 
  | 'observe' 
  | 'define' 
  | 'ideate' 
  | 'prototype' 
  | 'test' 
  | 'reflect';

export const STAGES: Stage[] = [
  'understand',
  'observe',
  'define',
  'ideate',
  'prototype',
  'test',
  'reflect'
];

// Friendly display names for stages
export const STAGE_NAMES: Record<Stage, string> = {
  understand: 'Understand',
  observe: 'Observe',
  define: 'Define Point of View',
  ideate: 'Ideate',
  prototype: 'Prototype',
  test: 'Test',
  reflect: 'Reflect'
};

export const STAGE_DESCRIPTIONS: Record<Stage, string> = {
  understand: 'Learn the problem space and context',
  observe: 'Collect data and insights about users',
  define: 'Create a clear problem statement',
  ideate: 'Generate creative solution ideas',
  prototype: 'Build a simple version of your solution',
  test: 'Validate your prototype with users',
  reflect: 'Review your journey and lessons learned'
};

// Structure for reflection questions per stage
export type ReflectionQuestion = {
  id: string;
  question: string;
  placeholder: string;
  type: 'text' | 'textarea' | 'multiChoice';
  required: boolean;
  options?: string[]; // For multi-choice questions
};

// Structure for stage content
export type StageContent = {
  title: string;
  description: string;
  videoUrl?: string;
  articles?: ResourceItem[];
  reflectionQuestions: ReflectionQuestion[];
  tasks: Task[];
};

// Resource structure
export type ResourceItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'pdf' | 'template';
};

// Task structure
export type Task = {
  id: string;
  title: string;
  description: string;
  required: boolean;
  completed?: boolean;
};

// User submission structure
export type UserSubmission = {
  stageId: Stage;
  answers: Record<string, string>;
  completed: boolean;
  feedback?: AIFeedback;
  completedTasks?: string[];
};

// AI Feedback structure
export type AIFeedback = {
  id: string;
  createdAt: Date;
  positiveFeedback: string;
  constructiveFeedback: string;
  suggestions: ResourceItem[];
  approved: boolean;
};

// User progress structure
export type UserProgress = {
  currentStage: Stage;
  submissions: Record<Stage, UserSubmission | null>;
  completedStages: Stage[];
};
