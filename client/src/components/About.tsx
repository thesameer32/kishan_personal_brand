export default function About() {
  const stats = [
    { value: "178K+", label: "Followers", testId: "stat-followers" },
    { value: "₹10CR+", label: "Revenue Impact", testId: "stat-revenue" },
    { value: "₹1CR+", label: "Personal Income", testId: "stat-income" },
    { value: "60", label: "MBA Days Series", testId: "stat-mba-days" }
  ];

  return (
    <section id="about" className="py-24 bg-secondary/50 section-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">About Kishan</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-body">
              I'm Kishan Kumar, a 20-year-old entrepreneur and business coach. I've helped creators, founders and early-stage businesses think clearly, act smarter, and build real results — without fluff. Currently running the viral 'MBA in 60 Days' series on Instagram with 178K+ followers and over ₹10CR in business impact created.
            </p>
          </div>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-6 text-center stat-card transition-all duration-300 hover:scale-105"
              data-testid={stat.testId}
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 font-heading">
                {stat.value}
              </div>
              <div className="text-gray-300 font-medium font-body">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
