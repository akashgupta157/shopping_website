import { Star } from "lucide-react";

export const ProductCard = ({ product, onClick }) => {
  return (
    <div
      className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square bg-white p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="p-4 space-y-2">
        <h3 className="font-medium line-clamp-1">{product.title}</h3>

        <div className="flex items-center gap-1">
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm ml-1">{product.rating?.rate || 4.5}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({product.rating?.count || 120})
          </span>
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="font-bold">${product.price}</span>
        </div>
      </div>
    </div>
  );
};
