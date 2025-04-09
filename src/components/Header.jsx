import { useContext } from "react";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router";
import { CartContext } from "../context/CartContext";
import { ShoppingCart, LogOut, Home, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="px-5 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-bold">FakeStore</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 ">
          <Button asChild variant="ghost">
            <Link to="/" className="flex items-center space-x-1">
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
          </Button>

          <Button asChild variant="ghost">
            <Link to="/cart" className="flex items-center space-x-1 relative">
              <ShoppingCart className="h-4 w-4" />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="flex items-center space-x-1"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger className="md:hidden">
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Button asChild variant="ghost">
                <Link to="/" className="flex items-center space-x-1">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button asChild variant="ghost">
                <Link
                  to="/cart"
                  className="flex items-center space-x-1 relative"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Link>
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="flex items-center space-x-1"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
