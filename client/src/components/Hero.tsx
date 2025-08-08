import kishanImage from '../assets/kishanimg.jpg?url';
import { useLocation } from 'wouter';

export default function Hero() {
  const [, setLocation] = useLocation();
  return (
    <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
      <div className="floating-particles">
        {[...Array(9)].map((_, i) => (
          <div 
            key={i}
            className="particle" 
            style={{
              left: `${10 + i * 10}%`,
              animationDelay: `${i}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="order-2 lg:order-1 animate-fade-up">
            <h1 className="font-heading font-bold text-4xl md:text-6xl xl:text-7xl mb-6 leading-tight">
              <span className="text-white">Kishan Kumar —</span><br/>
              <span className="text-gradient">Business Coach</span><br/>
              <span className="text-white">for the Next Generation</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-medium">
              178K+ followers | ₹10CR+ Business Impact | 1CR+ Income by Age 20
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => setLocation('/workshop-registration')}
                className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 animate-pulse-glow"
                data-testid="button-join-workshop"
              >
                <i className="fas fa-calendar-alt"></i>
                Reserve My Spot
              </button>
              <button 
                onClick={() => setLocation('/workshop-registration')}
                className="glass-card px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
                data-testid="button-reserve-free"
              >
                <i className="fas fa-gift"></i>
                Reserve My Spot Free
              </button>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center animate-float">
            <div className="relative">
              <div className="w-80 h-80 rounded-full glow-border p-2 animate-pulse-glow">
                <img 
                  src={kishanImage} 
                  alt="Kishan Kumar - Business Coach" 
                  className="w-full h-full rounded-full object-cover"
                  data-testid="img-kishan-profile"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-float">
                <i className="fas fa-rocket text-primary text-2xl"></i>
              </div>
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-float" 
                style={{ animationDelay: '1s' }}
              >
                <i className="fas fa-chart-line text-primary text-2xl"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
