
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane } from "lucide-react";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Support", href: "/support" },
    { name: "About", href: "/about" }
  ];

  const authLinks = [
    { name: "Login", href: "/login" },
    { name: "Register", href: "/register", isPrimary: true }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-airline-white header-shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Plane className="h-6 w-6 text-airline-teal mr-2" />
              <span className="text-2xl font-bold text-airline-teal">NAMMA</span>
              <span className="text-xl font-medium ml-1">AIRLINES</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors hover:text-airline-teal ${
                    isActive(item.href) 
                      ? "text-airline-teal" 
                      : "text-gray-600"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {authLinks.map((link) => (
              <Button
                key={link.name}
                variant={link.isPrimary ? "default" : "outline"}
                asChild
                className={link.isPrimary ? "bg-airline-orange hover:bg-orange-600 text-white" : ""}
              >
                <Link to={link.href}>{link.name}</Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 pb-6 border-t border-gray-200 animate-fade-in">
            <div className="flex flex-col space-y-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`py-2 text-base font-medium ${
                    isActive(item.href)
                      ? "text-airline-teal"
                      : "text-gray-600"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-3 pt-4">
                {authLinks.map((link) => (
                  <Button
                    key={link.name}
                    variant={link.isPrimary ? "default" : "outline"}
                    onClick={() => setMobileMenuOpen(false)}
                    asChild
                    className={`w-full ${link.isPrimary ? "bg-airline-orange hover:bg-orange-600 text-white" : ""}`}
                  >
                    <Link to={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
