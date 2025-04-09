import { X } from "lucide-react";
import { Button } from "./ui/button";

export const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  console.log("CartItem", item.quantity);
  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row gap-4">
      <div className="w-24 h-24 bg-white p-2 rounded border">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-medium line-clamp-2">{item.title}</h3>
        <p className="text-muted-foreground text-sm">${item.price}</p>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              -
            </Button>
            <span className="text-sm font-medium text-muted-foreground">
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.quantity + 1)}
            >
              +
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-destructive"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
