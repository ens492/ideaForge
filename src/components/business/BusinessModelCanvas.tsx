
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/context/AppContext";

type CanvasSection = {
  id: string;
  title: string;
  description: string;
  placeholder: string;
};

const canvasSections: CanvasSection[] = [
  {
    id: "customer_segments",
    title: "Customer Segments",
    description: "Who are your customers?",
    placeholder: "Describe your target customers..."
  },
  {
    id: "value_propositions",
    title: "Value Propositions",
    description: "What value do you deliver?",
    placeholder: "Describe your unique value proposition..."
  },
  {
    id: "channels",
    title: "Channels",
    description: "How do you reach customers?",
    placeholder: "List your distribution and communication channels..."
  },
  {
    id: "customer_relationships",
    title: "Customer Relationships",
    description: "How do you interact with customers?",
    placeholder: "Describe your customer relationship strategy..."
  },
  {
    id: "revenue_streams",
    title: "Revenue Streams",
    description: "How do you make money?",
    placeholder: "Describe your revenue model and pricing strategy..."
  },
  {
    id: "key_resources",
    title: "Key Resources",
    description: "What resources do you need?",
    placeholder: "List the essential resources for your business..."
  },
  {
    id: "key_activities",
    title: "Key Activities",
    description: "What activities must you perform?",
    placeholder: "Describe the critical activities for your business..."
  },
  {
    id: "key_partners",
    title: "Key Partners",
    description: "Who are your key partners?",
    placeholder: "List important partnerships and suppliers..."
  },
  {
    id: "cost_structure",
    title: "Cost Structure",
    description: "What are your main costs?",
    placeholder: "Outline your primary costs and expenses..."
  }
];

export const BusinessModelCanvas: React.FC = () => {
  const { progress, updateSubmission } = useAppContext();
  const submission = progress.submissions["reflect"];
  
  // Initialize canvas state from stored answers or defaults
  const [canvasData, setCanvasData] = useState<Record<string, string>>(
    (submission?.answers && submission.answers.businessModel 
      ? JSON.parse(submission.answers.businessModel) 
      : {}) as Record<string, string>
  );
  
  const handleSectionChange = (sectionId: string, value: string) => {
    const updatedCanvas = {
      ...canvasData,
      [sectionId]: value
    };
    
    setCanvasData(updatedCanvas);
    
    // Store in submission
    if (submission) {
      const updatedAnswers = {
        ...submission.answers,
        businessModel: JSON.stringify(updatedCanvas)
      };
      
      updateSubmission("reflect", {
        answers: updatedAnswers
      });
    }
  };
  
  const handleExport = () => {
    // Create a text version of the canvas for export
    let canvasText = "# BUSINESS MODEL CANVAS\n\n";
    
    canvasSections.forEach(section => {
      canvasText += `## ${section.title}\n`;
      canvasText += `${canvasData[section.id] || "Not defined"}\n\n`;
    });
    
    // Create a downloadable file
    const blob = new Blob([canvasText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "business_model_canvas.txt";
    a.click();
    URL.revokeObjectURL(url);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Business Model Canvas</h2>
        <Button onClick={handleExport} variant="outline">
          Export Canvas
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {canvasSections.map((section) => (
          <Card key={section.id} className="h-full">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{section.title}</CardTitle>
              <p className="text-sm text-gray-500">{section.description}</p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={canvasData[section.id] || ""}
                onChange={(e) => handleSectionChange(section.id, e.target.value)}
                placeholder={section.placeholder}
                className="min-h-24 resize-none"
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-idea-50 p-4 rounded-lg border border-idea-100">
        <h4 className="font-medium text-idea-800 mb-2">Tips for a Great Business Model Canvas</h4>
        <ul className="list-disc pl-5 text-idea-700 space-y-1 text-sm">
          <li>Focus on the customer value first - it's the heart of your model</li>
          <li>Be specific and concrete in each section</li>
          <li>Think about dependencies between sections</li>
          <li>Consider alternatives for each component</li>
          <li>Use real data wherever possible</li>
        </ul>
      </div>
    </div>
  );
};
