
import { useState } from "react";
import { Task, Stage } from "@/types";
import { useAppContext } from "@/context/AppContext";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

type TaskListProps = {
  tasks: Task[];
  stage: Stage;
};

export const TaskList: React.FC<TaskListProps> = ({ tasks, stage }) => {
  const { progress, updateSubmission } = useAppContext();
  const submission = progress.submissions[stage];
  
  // Initialize with defaults or from stored progress
  const [completedTasks, setCompletedTasks] = useState<string[]>(
    submission?.completedTasks || []
  );

  const handleTaskToggle = (taskId: string) => {
    const newCompletedTasks = completedTasks.includes(taskId)
      ? completedTasks.filter(id => id !== taskId)
      : [...completedTasks, taskId];
    
    setCompletedTasks(newCompletedTasks);
    
    // Update submission in context with the completed tasks
    updateSubmission(stage, { 
      completedTasks: newCompletedTasks 
    });
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => {
        const isCompleted = completedTasks.includes(task.id);
        
        return (
          <div
            key={task.id}
            className="flex items-start p-4 rounded-lg bg-white border border-gray-200 hover:border-idea-200 transition-colors"
          >
            <div className="flex items-center h-5">
              <Checkbox
                id={task.id}
                checked={isCompleted}
                onCheckedChange={() => handleTaskToggle(task.id)}
                className="h-5 w-5 border-2 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={task.id}
                className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}
              >
                {task.title} {task.required && <span className="text-idea-600">*</span>}
              </label>
              <p className={`mt-1 ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
                {task.description}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
