
import { ResourceItem } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, File, FileText, Link } from "lucide-react";

type ResourceCardProps = {
  resource: ResourceItem;
};

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  // Determine the appropriate icon based on resource type
  const getResourceIcon = () => {
    switch(resource.type) {
      case 'pdf':
        return <FileText className="h-4 w-4" />;
      case 'template':
        return <File className="h-4 w-4" />;
      case 'video':
        return <FileText className="h-4 w-4" />;
      default:
        return <Link className="h-4 w-4" />;
    }
  };

  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex-grow">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="mb-2 capitalize">
            {resource.type}
          </Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>{resource.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 pb-4">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-idea-600 hover:text-idea-700 text-sm font-medium transition-colors"
        >
          {getResourceIcon()}
          <span className="ml-1">View Resource</span>
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </CardContent>
    </Card>
  );
};
