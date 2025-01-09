import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface ScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectStages: Array<{
    title: string;
    date: string;
    status: string;
  }>;
}

const ScheduleDialog = ({ open, onOpenChange, projectStages }: ScheduleDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showRescheduleAlert, setShowRescheduleAlert] = useState(false);

  // Convert string dates to Date objects for the calendar
  const projectDates = projectStages.map(stage => new Date(stage.date));

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      setShowRescheduleAlert(true);
    }
  };

  const handleRescheduleRequest = () => {
    // Here you would typically send the reschedule request to the backend
    console.log("Reschedule requested for:", selectedDate);
    setShowRescheduleAlert(false);
    setSelectedDate(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Project Schedule</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 p-4">
          {/* Calendar Section */}
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiers={{
                  projectDates: projectDates,
                }}
                modifiersStyles={{
                  projectDates: {
                    fontWeight: 'bold',
                    backgroundColor: 'rgb(30 41 59 / 0.1)',
                  }
                }}
              />
            </div>
            
            {showRescheduleAlert && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Would you like to request rescheduling to {selectedDate && format(selectedDate, 'MMMM d, yyyy')}?
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-4"
                    onClick={handleRescheduleRequest}
                  >
                    Request Change
                  </Button>
                </AlertDescription>
              </Alert>
            )}
          </div>

          {/* Project Timeline */}
          <div className="space-y-4">
            <h3 className="font-medium">Project Timeline</h3>
            <div className="space-y-3">
              {projectStages.map((stage, index) => (
                <div 
                  key={index} 
                  className={`p-3 rounded-lg border ${
                    stage.status === 'completed' ? 'bg-success/10 border-success/20' :
                    stage.status === 'in-progress' ? 'bg-primary/10 border-primary/20' :
                    'bg-muted border-accent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    <div>
                      <p className="font-medium">{stage.title}</p>
                      <p className="text-sm text-muted-foreground">{stage.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleDialog;