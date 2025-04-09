import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { CartContext } from "@/context/CartContext";
import { Skeleton } from "../components/ui/skeleton";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect, useContext } from "react";
import {
  ChevronLeft,
  ShoppingCart,
  Plus,
  Minus,
  CircleCheckBig,
} from "lucide-react";

export const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({ ...product, quantity });
    toast.success("Product added to cart", {
      icon: <CircleCheckBig />,
      style: {
        backgroundColor: "#4caf50",
        color: "#fff",
      },
    });
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (error)
    return (
      <div className="container py-8 text-center text-destructive">{error}</div>
    );

  return (
    <div className="container py-8 px-5">
      <Button variant="outline" onClick={() => navigate(-1)} className="mb-6">
        <ChevronLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      {loading ? (
        <div className="grid md:grid-cols-2 gap-8">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="space-y-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/5" />
            <Skeleton className="h-10 w-32 mt-8" />
          </div>
        </div>
      ) : product ? (
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg border overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-contain p-4"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>

            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">${product.price}</span>
              {product.price > 100 && (
                <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Free Shipping
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Category: {product.category}</span>
              <span>•</span>
              <span className="text-yellow-500">★★★★☆</span>
              <span>(24 reviews)</span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4 pt-4">
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={decrementQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={incrementQuantity}
                  className="h-8 w-8 p-0"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <Button onClick={handleAddToCart} className="flex-1">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>

            {/* Additional Info */}
            <div className="pt-6 border-t mt-6">
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• High-quality materials</li>
                <li>• 30-day return policy</li>
                <li>• Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">Product not found</div>
      )}
    </div>
  );
};
