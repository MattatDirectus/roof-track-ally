import { CheckCircle2, Clock, Package, Calendar, MessageCircle, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DocumentViewer } from "./DocumentViewer";
import ScheduleDialog from "./ScheduleDialog";
import TeamSection from "./TeamSection";

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
      status: "completed" 
    },
    { 
      id: 2, 
      title: "Materials Ordered", 
      icon: Package, 
      date: "Mar 20, 2024", 
      details: "GAF Timberline HDZ Shingles",
      status: "in-progress",
      notification: "Materials arriving in 3 days"
    },
    { 
      id: 3, 
      title: "Installation Scheduled", 
      icon: Clock, 
      date: "Apr 5, 2024", 
      details: "Weather permitting",
      status: "pending" 
    },
    { 
      id: 4, 
      title: "Project Complete", 
      icon: CheckCircle2, 
      date: "Apr 8, 2024", 
      details: "Final inspection and cleanup",
      status: "pending" 
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
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10 rounded-t-xl mb-6">
        <div className="p-4">
          <h1 className="text-2xl font-semibold mb-1">Good afternoon, Mr. Carter!</h1>
          <p className="text-sm text-muted-foreground">Here's the latest update on your roof renovation (#RF-2024-001)</p>
        </div>
      </div>

      {/* Team Section */}
      <TeamSection />

      {/* Notification */}
      {showNotification && (
        <Alert className="mb-6">
          <AlertDescription>
            Materials delivery scheduled for March 20th. Please ensure driveway access.
          </AlertDescription>
        </Alert>
      )}

      {/* Current Stage */}
      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-muted-foreground">Current Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-primary/10">
                {(() => {
                  const CurrentIcon = getCurrentStage().icon;
                  return <CurrentIcon className="w-5 h-5 text-primary" />;
                })()}
              </div>
              <div>
                <h2 className="font-medium">{getCurrentStage().title}</h2>
                <p className="text-sm text-muted-foreground">{getCurrentStage().details}</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{Math.round(getProgressPercentage())}%</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <button 
          onClick={() => setMessageDialogOpen(true)}
          className="flex flex-col items-center p-4 bg-white rounded-xl border hover:border-primary/20 transition-colors"
        >
          <MessageCircle className="w-6 h-6 text-primary mb-1" />
          <span className="text-xs">Message</span>
        </button>
        <button 
          onClick={() => setDocumentViewerOpen(true)}
          className="flex flex-col items-center p-4 bg-white rounded-xl border hover:border-primary/20 transition-colors"
        >
          <FileText className="w-6 h-6 text-primary mb-1" />
          <span className="text-xs">Documents</span>
        </button>
        <button 
          onClick={() => setScheduleDialogOpen(true)}
          className="flex flex-col items-center p-4 bg-white rounded-xl border hover:border-primary/20 transition-colors"
        >
          <Clock className="w-6 h-6 text-primary mb-1" />
          <span className="text-xs">Schedule</span>
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-4">
        {projectStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <div 
              key={stage.id}
              className={`bg-white p-4 rounded-xl border ${
                stage.status === "in-progress" ? "border-primary/20" : "border-accent"
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${getStatusColor(stage.status)}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{stage.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{stage.date}</p>
                    </div>
                  </div>
                  {stage.notification && (
                    <div className="mt-2 text-sm text-primary bg-primary/10 p-2 rounded-lg">
                      {stage.notification}
                    </div>
                  )}
                </div>
              </div>
            </div>
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