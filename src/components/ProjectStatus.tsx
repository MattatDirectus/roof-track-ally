import { CheckCircle2, Clock, Package, Calendar, MessageCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DocumentViewer } from "./DocumentViewer";
import ScheduleDialog from "./ScheduleDialog";
import TeamSection from "./TeamSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ProjectStatus = () => {
  const [showNotification, setShowNotification] = useState(true);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  const projectStages = [
    { 
      id: 1, 
      title: "Initial Consultation", 
      icon: Calendar, 
      date: "Mar 15, 2024", 
      details: "Virtual consultation completed",
      status: "completed",
      summary: "During our virtual consultation, we discussed your roofing needs and concerns. We assessed the current condition of your 20-year-old asphalt shingle roof and identified signs of wear, particularly around the chimney flashing. You expressed interest in upgrading to GAF Timberline HDZ architectural shingles in Charcoal. We also reviewed warranty options and discussed the timeline for completion."
    },
    { 
      id: 2, 
      title: "Materials Ordered", 
      icon: Package, 
      date: "Mar 20, 2024", 
      details: "GAF Timberline HDZ Shingles",
      status: "in-progress",
      notification: "Materials arriving in 3 days",
      summary: "We've placed the order for your roofing materials with our trusted supplier. The package includes GAF Timberline HDZ architectural shingles in Charcoal, synthetic underlayment, ice and water shield for vulnerable areas, and new flashing components. All materials are scheduled for delivery to your property on March 20th."
    },
    { 
      id: 3, 
      title: "Installation Scheduled", 
      icon: Clock, 
      date: "Apr 5, 2024", 
      details: "Weather permitting",
      status: "pending",
      summary: "Installation is scheduled to begin on April 5th, with an estimated completion time of 2-3 days, weather permitting. Our team will arrive at 7:30 AM to set up safety equipment and begin the tear-off process. We've coordinated with local weather services to ensure optimal conditions for your installation."
    },
    { 
      id: 4, 
      title: "Project Complete", 
      icon: CheckCircle2, 
      date: "Apr 8, 2024", 
      details: "Final inspection and cleanup",
      status: "pending",
      summary: "Upon completion, our team will conduct a thorough final inspection, ensure complete site cleanup, and walk you through the finished project. We'll provide documentation of the installation, warranty information, and maintenance guidelines. A follow-up inspection will be scheduled after the first significant rainfall."
    }
  ];

  const getCurrentStage = () => {
    return projectStages.find(stage => stage.status === "in-progress") || projectStages[0];
  };

  const getProgressPercentage = () => {
    const completed = projectStages.filter(stage => stage.status === "completed").length;
    return (completed / projectStages.length) * 100;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "completed":
        return "text-success bg-success/10";
      case "in-progress":
        return "text-primary bg-primary/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#1A1F2C] via-[#2C2E3E] to-[#1A1F2C] p-6 rounded-2xl shadow-lg w-full">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src="/lovable-uploads/91dd03e7-13cd-4439-9e3f-44e946944710.png" 
            alt="Ally Logo" 
            className="w-12 h-12"
          />
          <h1 className="text-2xl md:text-3xl font-bold text-white">Good afternoon, Mr. Carter!</h1>
        </div>
        <p className="text-white/80 text-sm md:text-base">Here's the latest update on your roof renovation (#RF-2024-001)</p>
      </div>

      {/* Team Section */}
      <Card className="border-none shadow-lg bg-white overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-secondary">Your Team</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamSection />
        </CardContent>
      </Card>

      {showNotification && (
        <Alert className="border-primary/20 bg-primary/5 shadow-sm">
          <AlertDescription className="text-primary font-medium">
            Materials delivery scheduled for March 20th. Please ensure driveway access.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Stage */}
      <Card className="border-none shadow-lg bg-gradient-to-br from-white to-accent/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-secondary">Current Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-xl bg-primary/10">
                {(() => {
                  const CurrentIcon = getCurrentStage().icon;
                  return <CurrentIcon className="w-6 h-6 text-primary" />;
                })()}
              </div>
              <div>
                <h2 className="text-lg font-medium">{getCurrentStage().title}</h2>
                <p className="text-sm text-muted-foreground">{getCurrentStage().details}</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium text-primary">{Math.round(getProgressPercentage())}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2 bg-accent" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: MessageCircle, label: "Message", action: () => setMessageDialogOpen(true) },
          { icon: FileText, label: "Documents", action: () => setDocumentViewerOpen(true) },
          { icon: Clock, label: "Schedule", action: () => setScheduleDialogOpen(true) }
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex items-center justify-center p-6 bg-white rounded-xl border border-accent hover:border-primary/20 hover:bg-accent/5 transition-all shadow-sm hover:shadow-md space-x-3"
          >
            <action.icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-secondary">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {projectStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <Accordion type="single" collapsible key={stage.id}>
              <AccordionItem value={`stage-${stage.id}`} className="border-0">
                <div 
                  className={`bg-white p-6 rounded-xl border shadow-sm transition-all hover:shadow-md ${
                    stage.status === "in-progress" ? "border-primary/20 bg-primary/5" : "border-accent"
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl ${
                      stage.status === "completed" ? "bg-success/10 text-success" :
                      stage.status === "in-progress" ? "bg-primary/10 text-primary" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <AccordionTrigger className="hover:no-underline pt-0">
                        <div className="flex items-start justify-between w-full">
                          <div>
                            <h3 className="font-medium text-base md:text-lg truncate">{stage.title}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground mt-1">{stage.date}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
                          {stage.summary}
                        </p>
                      </AccordionContent>
                    </div>
                  </div>
                  {stage.notification && (
                    <div className="mt-4 text-sm text-primary bg-primary/10 p-3 rounded-lg">
                      {stage.notification}
                    </div>
                  )}
                </div>
              </AccordionItem>
            </Accordion>
          );
        })}
      </div>

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
    </div>
  );
};

export default ProjectStatus;
