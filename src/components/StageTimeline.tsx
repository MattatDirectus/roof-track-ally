import { Calendar, Icon } from "lucide-react";

interface Stage {
  id: number;
  title: string;
  icon: Icon;
  date: string;
  details: string;
  status: "completed" | "in-progress" | "pending";
  notification?: string;
  summary: string;
}

interface StageTimelineProps {
  stages: Stage[];
}

const StageTimeline = ({ stages }: StageTimelineProps) => {
  const getProgressPercentage = () => {
    const completed = stages.filter(stage => stage.status === "completed").length;
    return (completed / stages.length) * 100;
  };

  return (
    <div className="flex justify-between items-center w-full relative">
      {stages.map((stage) => {
        const Icon = stage.icon;
        const isCompleted = stage.status === "completed";
        const isInProgress = stage.status === "in-progress";
        
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
            <div className="flex items-center space-x-1.5 mt-1">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <p className={`text-xs ${
                isCompleted || isInProgress ? "text-foreground/70" : "text-muted-foreground"
              }`}>
                {stage.date}
              </p>
            </div>
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
  );
};

export default StageTimeline;