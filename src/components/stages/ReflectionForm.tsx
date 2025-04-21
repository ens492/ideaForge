
import { useState } from "react";
import { Stage, ReflectionQuestion } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type ReflectionFormProps = {
  stage: Stage;
  questions: ReflectionQuestion[];
};

export const ReflectionForm: React.FC<ReflectionFormProps> = ({ stage, questions }) => {
  const { progress, updateSubmission, submitForFeedback, completeStage } = useAppContext();
  const submission = progress.submissions[stage];
  
  // Initialize from stored progress or defaults
  const [answers, setAnswers] = useState<Record<string, string>>(
    submission?.answers || {}
  );
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(submission?.feedback || null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Update submission in context
    updateSubmission(stage, { 
      stageId: stage,
      answers,
      completed: false 
    });
    
    // Get AI feedback
    const feedback = await submitForFeedback(stage);
    setFeedback(feedback);
    setIsSubmitting(false);
  };

  const handleContinue = () => {
    completeStage(stage);
  };

  const isFormComplete = questions
    .filter(q => q.required)
    .every(q => answers[q.id] && answers[q.id].trim() !== '');

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <Label htmlFor={question.id} className="text-base font-medium">
              {question.question}
              {question.required && <span className="text-idea-600 ml-1">*</span>}
            </Label>
            
            {question.type === 'text' && (
              <Input
                id={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => 
                  setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))
                }
                placeholder={question.placeholder}
                required={question.required}
                className="w-full"
              />
            )}
            
            {question.type === 'textarea' && (
              <Textarea
                id={question.id}
                value={answers[question.id] || ''}
                onChange={(e) => 
                  setAnswers(prev => ({ ...prev, [question.id]: e.target.value }))
                }
                placeholder={question.placeholder}
                required={question.required}
                className="w-full min-h-24"
              />
            )}
            
            {question.type === 'multiChoice' && question.options && (
              <RadioGroup
                value={answers[question.id] || ''}
                onValueChange={(value) => 
                  setAnswers(prev => ({ ...prev, [question.id]: value }))
                }
                className="space-y-2"
              >
                {question.options.map((option, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`${question.id}-${i}`} />
                    <Label htmlFor={`${question.id}-${i}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          </div>
        ))}
        
        {/* Submission Controls */}
        <div className="flex justify-end space-x-4 pt-4">
          <Button 
            type="submit" 
            className="bg-idea-600 hover:bg-idea-700"
            disabled={!isFormComplete || isSubmitting || !!feedback}
          >
            {isSubmitting ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit for Feedback'
            )}
          </Button>
        </div>
      </form>
      
      {/* AI Feedback Display */}
      {feedback && (
        <div className="space-y-4 mt-8">
          <h3 className="text-xl font-semibold text-gray-900">AI Feedback</h3>
          
          <Alert variant="default" className="bg-green-50 border-green-200">
            <Check className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800">Positive Feedback</AlertTitle>
            <AlertDescription className="text-green-700">
              {feedback.positiveFeedback}
            </AlertDescription>
          </Alert>
          
          <Alert variant="default" className="bg-blue-50 border-blue-200">
            <Check className="h-5 w-5 text-blue-600" />
            <AlertTitle className="text-blue-800">Constructive Feedback</AlertTitle>
            <AlertDescription className="text-blue-700">
              {feedback.constructiveFeedback}
            </AlertDescription>
          </Alert>
          
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-900 mb-2">Suggested Resources</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {feedback.suggestions.map((resource) => (
                  <div key={resource.id} className="p-4 border rounded-lg bg-white">
                    <h5 className="font-medium">{resource.title}</h5>
                    <p className="text-sm text-gray-600">{resource.description}</p>
                    <a 
                      href={resource.url} 
                      className="text-idea-600 text-sm mt-2 inline-block hover:underline"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View Resource
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-end mt-6">
            <Button 
              onClick={handleContinue}
              className="bg-idea-600 hover:bg-idea-700"
              disabled={!feedback.approved}
            >
              Continue to Next Stage
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
