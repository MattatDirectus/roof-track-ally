import { LucideIcon } from "lucide-react";

export interface Material {
  name: string;
  color?: string;
  quantity: string;
  details: string;
  image: string;
}

export interface Stage {
  id: number;
  title: string;
  icon: LucideIcon;
  date: string;
  details: string;
  status: "completed" | "in-progress" | "pending";
  notification?: string;
  summary: string;
}