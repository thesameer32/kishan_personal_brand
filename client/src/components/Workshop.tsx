export default function Workshop() {
  return (
    <section id="workshop" className="py-24 section-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">Join My Next Free Business Workshop</h2>
          <p className="text-xl text-gray-300 font-body">No fluff. Just clarity, systems, and real business thinking.</p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center animate-float">
              <i className="fas fa-calendar-alt text-primary"></i>
            </div>
            
            <h3 className="font-heading font-bold text-2xl md:text-3xl mb-4">Business Growth Masterclass</h3>
            <p className="text-gray-300 mb-6 text-lg font-body">Learn the exact strategies I used to build a ₹1CR+ business by age 20</p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8">
              <div className="flex items-center gap-3">
                <i className="fas fa-calendar text-primary"></i>
                <span className="text-lg" data-testid="text-workshop-date">January 25, 2025</span>
              </div>
              <div className="flex items-center gap-3">
                <i className="fas fa-clock text-primary"></i>
                <span className="text-lg" data-testid="text-workshop-time">7:00 PM IST</span>
              </div>
            </div>
            
            <button 
              className="btn-primary px-10 py-4 rounded-xl font-semibold text-lg w-full sm:w-auto"
              data-testid="button-reserve-spot"
            >
              Reserve My Spot - FREE
            </button>
            
            <div className="mt-6 text-sm text-gray-400">
              <i className="fas fa-users mr-2"></i>
              <span data-testid="text-workshop-limit">Limited to 500 participants</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
