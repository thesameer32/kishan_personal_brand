import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-card">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-heading font-bold text-xl text-gradient">
            Build With Kishan
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a 
              href="#about" 
              className="hover:text-primary transition-colors"
              data-testid="nav-about"
            >
              About
            </a>
            <a 
              href="#workshop" 
              className="hover:text-primary transition-colors"
              data-testid="nav-workshop"
            >
              Workshop
            </a>
            <a 
              href="#resources" 
              className="hover:text-primary transition-colors"
              data-testid="nav-resources"
            >
              Resources
            </a>
            <a 
              href="#contact" 
              className="hover:text-primary transition-colors"
              data-testid="nav-contact"
            >
              Contact
            </a>
            <a 
              href="/admin" 
              className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/30 transition-colors"
              data-testid="nav-admin"
            >
              Admin
            </a>
          </div>
          
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-mobile-menu"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 glass-card rounded-lg p-4">
            <div className="flex flex-col space-y-4">
              <a 
                href="#about" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-nav-about"
              >
                About
              </a>
              <a 
                href="#workshop" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-nav-workshop"
              >
                Workshop
              </a>
              <a 
                href="#resources" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-nav-resources"
              >
                Resources
              </a>
              <a 
                href="#contact" 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-nav-contact"
              >
                Contact
              </a>
              <a 
                href="/admin" 
                className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm hover:bg-primary/30 transition-colors"
                onClick={() => setIsMenuOpen(false)}
                data-testid="mobile-nav-admin"
              >
                Admin
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
