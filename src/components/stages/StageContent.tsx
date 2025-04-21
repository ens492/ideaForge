
import React from "react";
import { Stage, ReflectionQuestion } from "@/types";
import { stageContent } from "@/data/stages";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResourceCard } from "./ResourceCard";
import { TaskList } from "./TaskList";
import { ReflectionForm } from "./ReflectionForm";
import { BusinessModelCanvas } from "@/components/business/BusinessModelCanvas";

type StageContentProps = {
  stage: Stage;
};

export const StageContent: React.FC<StageContentProps> = ({ stage }) => {
  const content = stageContent[stage];

  return (
    <div className="space-y-8">
      {/* Stage Title and Description */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">{content.title}</h1>
        <p className="mt-2 text-lg text-gray-600 max-w-3xl mx-auto">
          {content.description}
        </p>
      </div>

      {/* Video Embed */}
      {content.videoUrl && (
        <Card className="overflow-hidden">
          <CardHeader className="pb-0">
            <CardTitle>Watch: Introduction to {content.title}</CardTitle>
            <CardDescription>
              Learn the key concepts and approaches for this stage
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="aspect-video w-full rounded-md overflow-hidden">
              <iframe
                width="100%"
                height="100%"
                src={content.videoUrl}
                title={`Video for ${content.title}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources */}
      {content.articles && content.articles.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.articles.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Tasks */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tasks</h2>
        <p className="text-gray-600 mb-4">
          Complete these tasks before submitting your reflection.
        </p>
        <TaskList tasks={content.tasks} stage={stage} />
      </div>

      <Separator />

      {/* Reflection Questions */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reflection</h2>
        <p className="text-gray-600 mb-6">
          Answer the following questions based on your learnings and tasks from this stage.
        </p>
        <ReflectionForm
          stage={stage}
          questions={content.reflectionQuestions}
        />
      </div>
      
      {/* Business Model Canvas (only shown in Reflect stage) */}
      {stage === 'reflect' && (
        <div className="mt-8">
          <Separator className="my-8" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Business Model Canvas</h2>
          <p className="text-gray-600 mb-6">
            Define your business model using the canvas below. This will help you articulate
            how your solution creates, delivers, and captures value.
          </p>
          <BusinessModelCanvas />
        </div>
      )}
    </div>
  );
};
