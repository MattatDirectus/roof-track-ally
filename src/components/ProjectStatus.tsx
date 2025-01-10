import { CheckCircle2, Clock, Package, Calendar, MessageCircle, FileText, ChevronRight, ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DocumentViewer } from "./DocumentViewer";
import ScheduleDialog from "./ScheduleDialog";
import TeamSection from "./TeamSection";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import MaterialsTrackingMap from './MaterialsTrackingMap';

const ProjectStatus = () => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const materials = [
    {
      name: "GAF Timberline HDZ Architectural Shingles",
      color: "Charcoal",
      quantity: "24 squares (72 bundles)",
      details: "High-definition shingles with LayerLock technology",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e"
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % materials.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + materials.length) % materials.length);
  };

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
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 space-y-6 bg-background min-h-screen relative pb-16">
      <div className="bg-gradient-subtle p-6 rounded-2xl shadow-lg w-full space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Good afternoon, Mr. Carter!</h1>
          <p className="text-foreground/80 text-sm md:text-base mt-2">Here's the latest update on your roof renovation (#RF-2024-001)</p>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center w-full relative">
            {projectStages.map((stage, index) => {
              const Icon = stage.icon;
              const isCompleted = stage.status === "completed";
              const isInProgress = stage.status === "in-progress";
              const isPending = stage.status === "pending";
              
              return (
                <div key={stage.id} className="flex flex-col items-center relative z-10 w-1/4">
                  <div 
                    className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors ${
                      isCompleted ? "bg-[#E7F6E7] text-[#4CAF50] border-[#4CAF50]" :
                      isInProgress ? "bg-primary text-primary-foreground border-primary" :
                      "bg-muted text-muted-foreground border-muted-foreground/30"
                    }`}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <p className={`text-sm mt-2 font-medium text-center ${
                    isCompleted || isInProgress ? "text-foreground" : "text-muted-foreground"
                  }`}>
                    {stage.title}
                  </p>
                  <p className={`text-xs text-center ${
                    isCompleted || isInProgress ? "text-foreground/70" : "text-muted-foreground"
                  }`}>
                    {stage.date}
                  </p>
                </div>
              );
            })}
            
            <div className="absolute top-7 left-0 w-full h-[3px] bg-muted -z-0">
              <div 
                className="h-full bg-[#E7F6E7]"
                style={{ 
                  width: `${getProgressPercentage()}%`,
                  transition: 'width 0.5s ease-out'
                }}
              />
            </div>
          </div>

          <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-accent mt-6">
            <div className="flex items-start space-x-4">
              <div className="p-3 rounded-xl bg-primary/10">
                {(() => {
                  const CurrentIcon = getCurrentStage().icon;
                  return <CurrentIcon className="w-6 h-6 text-primary" />;
                })()}
              </div>
              <div className="space-y-3 w-full">
                <div>
                  <h2 className="text-lg font-medium text-foreground">{getCurrentStage().title}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{getCurrentStage().details}</p>
                </div>
                {getCurrentStage().notification && (
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/20 shadow-sm">
                    <p className="text-primary font-semibold text-lg mt-1">Materials arriving in 3 days!</p>
                    <p className="text-sm text-primary/80 mt-1">Please ensure driveway access</p>
                    
                    <div className="mt-4 space-y-4">
                      <div className="relative h-48 w-full overflow-hidden rounded-lg">
                        <img 
                          src={materials[currentImageIndex].image} 
                          alt={materials[currentImageIndex].name}
                          className="w-full h-full object-cover"
                        />
                        <button 
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70 transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="space-y-3">
                        <h3 className="font-medium text-primary">Materials List:</h3>
                        {materials.map((material, index) => (
                          <div 
                            key={index} 
                            className={`p-3 rounded-lg ${
                              currentImageIndex === index 
                                ? "bg-primary/20 border border-primary/30" 
                                : "bg-primary/5"
                            }`}
                          >
                            <p className="font-medium text-primary">{material.name}</p>
                            {material.color && (
                              <p className="text-sm text-primary/80">Color: {material.color}</p>
                            )}
                            <p className="text-sm text-primary/80">Quantity: {material.quantity}</p>
                            <p className="text-xs text-primary/70 mt-1">{material.details}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="border-none shadow-lg bg-secondary">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-primary">Your Team</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <TeamSection projectStages={projectStages} />
        </CardContent>
      </Card>

      <MaterialsTrackingMap />

      <div className="space-y-4">
        {projectStages.map((stage) => {
          const Icon = stage.icon;
          return (
            <Accordion type="single" collapsible key={stage.id}>
              <AccordionItem value={`stage-${stage.id}`} className="border-0">
                <div 
                  className={`bg-secondary p-6 rounded-xl border shadow-lg transition-all hover:shadow-xl ${
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
                            <h3 className="font-medium text-base md:text-lg truncate text-foreground">{stage.title}</h3>
                            <div className="flex items-center space-x-1.5 mt-1">
                              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                              <p className="text-xs md:text-sm text-muted-foreground">{stage.date}</p>
                            </div>
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

      <div className="fixed bottom-0 left-0 right-0 bg-white py-4 border-t border-gray-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">Powered by</span>
          <img src="/ally-logo.svg" alt="Ally" className="h-6" />
        </div>
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
