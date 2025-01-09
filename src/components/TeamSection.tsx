import { UserRound, Mail, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

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
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952",
    email: "john.carter@example.com",
    phone: "(555) 123-4567",
    bio: "15+ years experience in project management, ensuring your roof replacement project runs smoothly from start to finish."
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Billing Manager",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    email: "sarah.miller@example.com",
    phone: "(555) 234-5678",
    bio: "Dedicated to providing transparent billing and helping you understand every aspect of your project's financials."
  },
  {
    id: 3,
    name: "Mike Rodriguez",
    role: "Lead Installer",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    email: "mike.rodriguez@example.com",
    phone: "(555) 345-6789",
    bio: "Master craftsman with 20+ years of roofing experience, certified in all major roofing systems."
  }
];

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-col items-center cursor-pointer group">
          <Avatar className="h-16 w-16 mb-2">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <p className="text-sm font-medium group-hover:text-primary">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.role}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Team Member Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 pt-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{member.name[0]}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h3 className="text-lg font-semibold">{member.name}</h3>
            <p className="text-sm text-muted-foreground">{member.role}</p>
          </div>
          <p className="text-sm text-center">{member.bio}</p>
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

const TeamSection = () => {
  return (
    <div className="bg-white p-6 rounded-xl border mb-6">
      <h2 className="text-lg font-semibold mb-4">Your Team</h2>
      <div className="flex justify-around items-center">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamSection;