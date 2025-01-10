import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Material } from "@/types/project";

interface MaterialsGalleryProps {
  materials: Material[];
}

const MaterialsGallery = ({ materials }: MaterialsGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % materials.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + materials.length) % materials.length);
  };

  return (
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
      
      <div className="space-y-2">
        <h3 className="font-medium text-primary">What's arriving:</h3>
        {materials.map((material, index) => (
          <div 
            key={index} 
            className={`p-3 rounded-lg ${
              currentImageIndex === index 
                ? "bg-primary/10 border border-primary/20" 
                : "bg-gray-100"
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
  );
};

export default MaterialsGallery;