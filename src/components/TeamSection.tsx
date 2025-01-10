import { UserRound, Mail, Phone, Info, MessageCircle, FileText, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import MessageDialog from "./MessageDialog";
import { DocumentViewer } from "./DocumentViewer";
import ScheduleDialog from "./ScheduleDialog";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  email: string;
  phone: string;
  bio: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "John Carter",
    role: "Account Manager",
    image: "/lovable-uploads/a8c80535-257c-4321-9ae3-ba6efc545740.png",
    email: "john.carter@example.com",
    phone: "(555) 123-4567",
    bio: "15+ years experience in project management, ensuring your roof replacement project runs smoothly from start to finish."
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Billing Manager",
    image: "/lovable-uploads/e148e6f1-aa2a-4ff1-b2d2-10b25c04b99a.png",
    email: "sarah.miller@example.com",
    phone: "(555) 234-5678",
    bio: "Dedicated to providing transparent billing and helping you understand every aspect of your project's financials."
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    role: "Lead Installer",
    image: "/lovable-uploads/d05dea90-4d47-4825-bbb1-abbfe2150720.png",
    email: "mike.rodriguez@example.com",
    phone: "(555) 345-6789",
    bio: "Master craftsman with 20+ years of roofing experience, certified in all major roofing systems."
  }
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-4 p-3 cursor-pointer rounded-lg transition-all duration-200 hover:bg-primary/5 group relative">
          <Avatar className="h-14 w-14 border-2 border-transparent group-hover:border-primary/20 transition-all">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-base font-medium text-foreground">{member.name}</p>
              <Info className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors" />
            </div>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Member Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Avatar className="h-24 w-24 border-2 border-primary/20">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
          <p className="text-sm text-center leading-relaxed">{member.bio}</p>
          <div className="flex flex-col space-y-2 w-full">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href={`mailto:${member.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                {member.email}
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href={`tel:${member.phone}`}>
                <Phone className="mr-2 h-4 w-4" />
                {member.phone}
              </a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const TeamSection = ({ projectStages }: { projectStages: any[] }) => {
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground leading-relaxed">
        Meet your dedicated project team. Each member is here to ensure your project runs smoothly. 
        Click on any team member to learn more about their role and contact them directly.
      </div>
      <div className="space-y-2">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-accent">
        {[
          { 
            icon: MessageCircle, 
            label: "Message", 
            action: () => setMessageDialogOpen(true),
            hasNotification: true 
          },
          { icon: FileText, label: "Documents", action: () => setDocumentViewerOpen(true) },
          { icon: Clock, label: "Schedule", action: () => setScheduleDialogOpen(true) }
        ].map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex items-center justify-center p-6 bg-secondary rounded-xl border border-accent hover:border-primary/20 hover:bg-accent/5 transition-all shadow-lg hover:shadow-xl space-x-3 relative"
          >
            <action.icon className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">{action.label}</span>
            {action.hasNotification && (
              <div className="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">1</span>
              </div>
            )}
          </button>
        ))}
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

export default TeamSection;