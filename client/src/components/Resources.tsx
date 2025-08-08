export default function Resources() {
  const resources = [
    {
      icon: "fas fa-rocket",
      title: "Business Growth Starter Kit",
      description: "Complete framework to launch and scale your business from zero to profit",
      testId: "resource-starter-kit"
    },
    {
      icon: "fab fa-instagram",
      title: "Instagram Bio Optimization Guide",
      description: "Convert more followers to customers with the perfect bio formula",
      testId: "resource-instagram-guide"
    },
    {
      icon: "fas fa-funnel-dollar",
      title: "Sales Funnel Template",
      description: "Ready-to-use funnel templates that convert visitors into paying customers",
      testId: "resource-sales-funnel"
    },
    {
      icon: "fas fa-chart-line",
      title: "MBA in 60 Days Workbook",
      description: "Complete study guide and exercises from the viral Instagram series",
      testId: "resource-mba-workbook"
    },
    {
      icon: "fas fa-money-bill-trend-up",
      title: "Revenue Tracking Dashboard",
      description: "Track your business metrics like a pro with this Google Sheets template",
      testId: "resource-revenue-dashboard"
    },
    {
      icon: "fas fa-brain",
      title: "Business Mindset Toolkit",
      description: "Mental frameworks and exercises to think like a successful entrepreneur",
      testId: "resource-mindset-toolkit"
    }
  ];

  return (
    <section id="resources" className="py-24 bg-secondary/30 section-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">Free Tools, Templates & Starter Kits</h2>
          <p className="text-xl text-gray-300 font-body">Everything you need to start building your business today</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => (
            <div 
              key={index}
              className="glass-card rounded-2xl p-8 resource-card transition-all duration-300 hover:scale-105"
              data-testid={resource.testId}
            >
              <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                <i className={`${resource.icon} text-primary text-2xl`}></i>
              </div>
              <h3 className="font-heading font-bold text-xl mb-4">{resource.title}</h3>
              <p className="text-gray-300 mb-6 font-body">{resource.description}</p>
              <button 
                className="w-full bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary py-3 rounded-xl font-semibold transition-all"
                data-testid={`button-download-${index}`}
              >
                <i className="fas fa-download mr-2"></i>
                Download Free
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
