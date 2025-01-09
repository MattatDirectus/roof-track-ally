import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText, Image as ImageIcon } from "lucide-react";

type Document = {
  id: string;
  title: string;
  type: "image" | "document";
  url: string;
  date: string;
};

const documents: Document[] = [
  {
    id: "1",
    title: "Project Blueprint",
    type: "image",
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    date: "Mar 15, 2024"
  },
  {
    id: "2",
    title: "Material Specifications",
    type: "document",
    url: "/documents/specs.pdf",
    date: "Mar 16, 2024"
  },
  {
    id: "3",
    title: "Site Survey",
    type: "image",
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "Mar 17, 2024"
  },
  {
    id: "4",
    title: "Contract Agreement",
    type: "document",
    url: "/documents/contract.pdf",
    date: "Mar 18, 2024"
  }
];

export function DocumentViewer({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const [activeDocument, setActiveDocument] = useState<Document | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] h-[80vh]">
        <DialogHeader>
          <DialogTitle>Project Documents</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col h-full gap-4">
          <div className="flex-1 relative">
            {activeDocument ? (
              <div className="w-full h-full flex items-center justify-center bg-secondary rounded-lg">
                {activeDocument.type === 'image' ? (
                  <img
                    src={activeDocument.url}
                    alt={activeDocument.title}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="w-16 h-16" />
                    <span>{activeDocument.title}</span>
                    <a
                      href={activeDocument.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Open Document
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Select a document to view
              </div>
            )}
          </div>
          <ScrollArea className="h-[150px] border rounded-lg p-4">
            <Carousel className="w-full">
              <CarouselContent>
                {documents.map((doc) => (
                  <CarouselItem key={doc.id} className="basis-1/4">
                    <button
                      onClick={() => setActiveDocument(doc)}
                      className={`w-full h-[100px] rounded-lg border p-2 flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors ${
                        activeDocument?.id === doc.id ? 'border-primary' : ''
                      }`}
                    >
                      {doc.type === 'image' ? (
                        <ImageIcon className="w-6 h-6 text-primary" />
                      ) : (
                        <FileText className="w-6 h-6 text-primary" />
                      )}
                      <span className="text-xs text-center line-clamp-2">{doc.title}</span>
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}