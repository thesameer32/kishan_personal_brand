export default function Footer() {
  const quickLinks = [
    { href: "#about", label: "About", testId: "footer-link-about" },
    { href: "#workshop", label: "Workshop", testId: "footer-link-workshop" },
    { href: "#resources", label: "Resources", testId: "footer-link-resources" },
    { href: "#contact", label: "Contact", testId: "footer-link-contact" }
  ];

  const socialLinks = [
    { 
      href: "#", 
      icon: "fab fa-instagram", 
      label: "Instagram",
      testId: "footer-social-instagram" 
    },
    { 
      href: "#", 
      icon: "fab fa-linkedin", 
      label: "LinkedIn",
      testId: "footer-social-linkedin" 
    },
    { 
      href: "#", 
      icon: "fab fa-youtube", 
      label: "YouTube",
      testId: "footer-social-youtube" 
    }
  ];

  return (
    <footer className="py-16 bg-brand-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="font-heading font-bold text-2xl text-gradient mb-4">Build With Kishan</div>
            <p className="text-gray-400 font-body">
              Empowering the next generation of entrepreneurs with practical business education and proven strategies.
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.href} 
                  className="block text-gray-400 hover:text-primary transition-colors font-body"
                  data-testid={link.testId}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Connect</h4>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.href} 
                  className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center text-primary hover:bg-primary/30 transition-colors"
                  aria-label={social.label}
                  data-testid={social.testId}
                >
                  <i className={social.icon}></i>
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm font-body">Follow for daily business insights</p>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-gray-400 font-body" data-testid="text-copyright">
            © 2025 Build With Kishan. Designed to Educate.
          </p>
        </div>
      </div>
    </footer>
  );
}
