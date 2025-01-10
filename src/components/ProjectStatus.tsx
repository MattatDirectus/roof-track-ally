import { CheckCircle2, Clock, Package, Calendar } from "lucide-react";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DocumentViewer } from "./DocumentViewer";
import ScheduleDialog from "./ScheduleDialog";
import TeamSection from "./TeamSection";
import StageTimeline from "./StageTimeline";
import CurrentStageCard from "./CurrentStageCard";
import MaterialsTrackingMap from "./MaterialsTrackingMap";

const ProjectStatus = () => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  const materials = [
    {
      name: "GAF Timberline HDZ Architectural Shingles",
      color: "Charcoal",
      quantity: "24 squares (72 bundles)",
      details: "High-definition shingles with LayerLock technology",
      image: "/lovable-uploads/f46167b1-f125-41a7-b5ea-ce46191291df.png"
    },
    {
      name: "Synthetic Underlayment",
      quantity: "5 rolls (1000 sq ft each)",
      details: "Premium moisture barrier protection",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
    },
    {
      name: "Ice & Water Shield",
      quantity: "2 rolls (200 sq ft each)",
      details: "For valleys and vulnerable areas",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    }
  ];

  const projectStages = [
    { 
      id: 1, 
      title: "Initial Consultation", 
      icon: Calendar, 
      date: "Mar 15, 2024", 
      details: "Virtual consultation completed",
      status: "completed" as const,
      summary: "During our virtual consultation, we discussed your roofing needs and concerns. We assessed the current condition of your 20-year-old asphalt shingle roof and identified signs of wear, particularly around the chimney flashing. You expressed interest in upgrading to GAF Timberline HDZ architectural shingles in Charcoal. We also reviewed warranty options and discussed the timeline for completion."
    },
    { 
      id: 2, 
      title: "Materials Ordered", 
      icon: Package, 
      date: "Mar 20, 2024", 
      details: "GAF Timberline HDZ Shingles",
      status: "in-progress" as const,
      notification: "Materials arriving in 3 days",
      summary: "We've placed the order for your roofing materials with our trusted supplier. The package includes GAF Timberline HDZ architectural shingles in Charcoal, synthetic underlayment, ice and water shield for vulnerable areas, and new flashing components. All materials are scheduled for delivery to your property on March 20th."
    },
    { 
      id: 3, 
      title: "Installation Scheduled", 
      icon: Clock, 
      date: "Apr 5, 2024", 
      details: "Weather permitting",
      status: "pending" as const,
      summary: "Installation is scheduled to begin on April 5th, with an estimated completion time of 2-3 days, weather permitting. Our team will arrive at 7:30 AM to set up safety equipment and begin the tear-off process. We've coordinated with local weather services to ensure optimal conditions for your installation."
    },
    { 
      id: 4, 
      title: "Project Complete", 
      icon: CheckCircle2, 
      date: "Apr 8, 2024", 
      details: "Final inspection and cleanup",
      status: "pending" as const,
      summary: "Upon completion, our team will conduct a thorough final inspection, ensure complete site cleanup, and walk you through the finished project. We'll provide documentation of the installation, warranty information, and maintenance guidelines. A follow-up inspection will be scheduled after the first significant rainfall."
    }
  ];

  const getCurrentStage = () => {
    return projectStages.find(stage => stage.status === "in-progress") || projectStages[0];
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 bg-background min-h-screen pb-16">
      <div className="bg-gradient-subtle p-6 rounded-2xl shadow-lg w-full space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Good afternoon, Mr. Carter!</h1>
          <p className="text-foreground/80 text-sm md:text-base mt-2">Here's the latest update on your roof renovation (#RF-2024-001)</p>
        </div>
        
        <StageTimeline stages={projectStages} />
        <CurrentStageCard stage={getCurrentStage()} materials={materials} />
        <MaterialsTrackingMap />
      </div>

      <TeamSection projectStages={projectStages} />

      <MessageDialog 
        open={messageDialogOpen} 
        onOpenChange={setMessageDialogOpen} 
      />

      <DocumentViewer
        open={documentViewerOpen}
        onOpenChange={setDocumentViewerOpen}
      />

      <ScheduleDialog
        open={scheduleDialogOpen}
        onOpenChange={setScheduleDialogOpen}
        projectStages={projectStages}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <img src="/ally-logo.svg" alt="Ally" className="h-6" />
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;