import { CheckCircle2, Clock, Package, Calendar, ArrowRight } from "lucide-react";

const ProjectStatus = () => {
  const currentStep = 2;
  const steps = [
    { id: 1, title: "Initial Consultation", icon: Calendar, date: "Mar 15, 2024", completed: true },
    { id: 2, title: "Materials Ordered", icon: Package, date: "Mar 20, 2024", completed: true },
    { id: 3, title: "Installation Scheduled", icon: Clock, date: "Apr 5, 2024", completed: false },
    { id: 4, title: "Project Complete", icon: CheckCircle2, date: "Apr 8, 2024", completed: false },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="relative mb-12">
        <div className="absolute h-1 bg-muted w-full top-1/2 -translate-y-1/2 rounded-full">
          <div 
            className="h-full bg-success rounded-full animate-progress-advance" 
            style={{ "--progress-width": `${(currentStep / (steps.length - 1)) * 100}%` } as any}
          />
        </div>
        <div className="relative flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 
                  ${step.completed ? 'bg-success text-white' : 'bg-muted text-secondary'}`}
              >
                <step.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium mt-2">{step.title}</span>
              <span className="text-xs text-secondary mt-1">{step.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent">
          <h3 className="text-lg font-semibold mb-4">Current Status</h3>
          <div className="flex items-center text-success">
            <Package className="w-5 h-5 mr-2" />
            <span>Materials in Transit</span>
          </div>
          <p className="mt-2 text-secondary text-sm">
            Your roofing materials are on their way! Expected delivery: March 25th
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-accent">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <div className="flex items-center text-primary">
            <Clock className="w-5 h-5 mr-2" />
            <span>Installation Scheduling</span>
          </div>
          <p className="mt-2 text-secondary text-sm">
            Once materials arrive, we'll confirm your installation date
          </p>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl p-6 shadow-sm border border-accent">
        <h3 className="text-lg font-semibold mb-4">Recent Updates</h3>
        <div className="space-y-4">
          {[
            { date: "Mar 20", text: "Materials ordered from supplier", icon: Package },
            { date: "Mar 15", text: "Initial consultation completed", icon: CheckCircle2 },
          ].map((update, i) => (
            <div key={i} className="flex items-start">
              <div className="w-12 text-sm text-secondary">{update.date}</div>
              <div className="w-6 flex justify-center">
                <update.icon className="w-5 h-5 text-success" />
              </div>
              <div className="flex-1 text-sm">{update.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectStatus;