import { LucideIcon } from "lucide-react";
import MaterialsGallery from "./MaterialsGallery";

interface Material {
  name: string;
  color?: string;
  quantity: string;
  details: string;
  image: string;
}

interface Stage {
  id: number;
  title: string;
  icon: LucideIcon;
  date: string;
  details: string;
  status: "completed" | "in-progress" | "pending";
  notification?: string;
  summary: string;
}

interface CurrentStageCardProps {
  stage: Stage;
  materials: Material[];
}

const CurrentStageCard = ({ stage, materials }: CurrentStageCardProps) => {
  const Icon = stage.icon;

  return (
    <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-accent mt-6">
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div className="space-y-3 w-full">
          <div>
            <h2 className="text-lg font-medium text-foreground">{stage.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{stage.details}</p>
          </div>
          {stage.notification && (
            <div className="w-full bg-primary/10 p-4 rounded-lg border-2 border-primary/20 shadow-sm">
              <p className="text-primary font-semibold text-lg mt-1">Materials arriving in 3 days!</p>
              <p className="text-sm text-primary/80 mt-1">Please ensure driveway access</p>
              <MaterialsGallery materials={materials} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrentStageCard;