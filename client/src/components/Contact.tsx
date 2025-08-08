import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    newsletter: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for your message! I'll get back to you soon.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
      newsletter: false
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <section id="contact" className="py-24 bg-secondary/50 section-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">Get In Touch</h2>
          <p className="text-xl text-gray-300 font-body">Have a question? Want to collaborate? Let's connect!</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <form className="space-y-6" onSubmit={handleSubmit} data-testid="contact-form">
              <div>
                <label className="block text-sm font-medium mb-2 font-body">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors" 
                  placeholder="Your full name"
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 font-body">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors" 
                  placeholder="your@email.com"
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 font-body">Message</label>
                <textarea 
                  rows={5} 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:border-primary focus:outline-none transition-colors resize-none" 
                  placeholder="Tell me about your business goals..."
                  data-testid="textarea-message"
                />
              </div>
              
              <div className="flex items-center gap-3">
                <input 
                  type="checkbox" 
                  id="newsletter" 
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary bg-white/5 border border-white/10 rounded focus:ring-primary"
                  data-testid="checkbox-newsletter"
                />
                <label htmlFor="newsletter" className="text-sm text-gray-300 font-body">
                  Get updates on new workshops and resources
                </label>
              </div>
              
              <button 
                type="submit" 
                className="btn-primary w-full py-4 rounded-xl font-semibold text-lg"
                data-testid="button-send-message"
              >
                Send Message
              </button>
            </form>
            
            <div className="text-center mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-300 mb-4 font-body">Prefer instant messaging?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#" 
                  className="flex items-center gap-3 bg-green-600/20 hover:bg-green-600/30 text-green-400 px-6 py-3 rounded-xl transition-colors"
                  data-testid="link-whatsapp"
                >
                  <i className="fab fa-whatsapp"></i>
                  WhatsApp
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 px-6 py-3 rounded-xl transition-colors"
                  data-testid="link-telegram"
                >
                  <i className="fab fa-telegram"></i>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
