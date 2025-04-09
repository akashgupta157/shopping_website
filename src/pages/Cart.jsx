import { toast } from "sonner";
import { useContext } from "react";
import { CheckCircle } from "lucide-react";
import { CartItem } from "../components/CartItem";
import { Button } from "../components/ui/button";
import { CartContext } from "@/context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } =
    useContext(CartContext);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    clearCart();
    toast.success("Order placed successfully", {
      icon: <CheckCircle className="h-4 w-4" />,
      description: "Thank you for your purchase!",
      duration: 4000,
      action: {
        label: "Continue Shopping",
        onClick: () => (window.location.href = "/"),
      },
      style: {
        backgroundColor: "#4caf50",
      },
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container py-8 px-5 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground text-center">
          Looks like you haven't added anything to your cart yet
        </p>
        <Button onClick={() => (window.location.href = "/")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 px-5">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={(newQuantity) =>
                updateQuantity(item.id, newQuantity)
              }
              onRemove={() => removeFromCart(item.id)}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="border rounded-lg p-6 h-fit sticky top-4">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>

            <div className="border-t pt-4 flex justify-between font-bold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <Button className="w-full mt-4" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
