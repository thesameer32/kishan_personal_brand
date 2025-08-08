export default function Instagram() {
  const instagramPosts = [
    {
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Business strategy post",
      testId: "instagram-post-1"
    },
    {
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Educational entrepreneurship content",
      testId: "instagram-post-2"
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Young entrepreneur working",
      testId: "instagram-post-3"
    },
    {
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Business coaching session",
      testId: "instagram-post-4"
    },
    {
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "Financial growth charts",
      testId: "instagram-post-5"
    },
    {
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=400",
      alt: "MBA education content",
      testId: "instagram-post-6"
    }
  ];

  return (
    <section className="py-24 section-reveal opacity-0 translate-y-8 transition-all duration-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-4xl md:text-5xl mb-6 text-gradient">Follow My Journey</h2>
          <p className="text-xl text-gray-300 mb-8 font-body">Daily business breakdowns & real strategy on Instagram</p>
          
          <div className="glass-card rounded-3xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {instagramPosts.map((post, index) => (
                <div 
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer"
                  data-testid={post.testId}
                >
                  <img 
                    src={post.image}
                    alt={post.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-lg text-gray-300 mb-6 font-body">
                Follow @buildwithkishan for daily business breakdowns & real strategy.
              </p>
              <button 
                className="btn-primary px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 mx-auto"
                data-testid="button-follow-instagram"
              >
                <i className="fab fa-instagram"></i>
                Follow Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
