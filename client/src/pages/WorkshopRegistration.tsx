import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';

export default function WorkshopRegistration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    profession: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [spotsLeft, setSpotsLeft] = useState(47);
  const [recentRegistrations, setRecentRegistrations] = useState([
    { name: 'Priya S.', profession: 'Student', time: '2 min ago' },
    { name: 'Rahul M.', profession: 'Entrepreneur', time: '5 min ago' },
    { name: 'Anjali K.', profession: 'Business Owner', time: '8 min ago' },
    { name: 'Vikram S.', profession: 'Freelancer', time: '12 min ago' },
    { name: 'Meera P.', profession: 'Student', time: '15 min ago' }
  ]);
  const [, setLocation] = useLocation();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/workshop/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          profession: formData.profession
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setError('');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft(prev => {
        if (prev > 1) {
          return prev - Math.floor(Math.random() * 2);
        }
        return prev;
      });
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleWhatsAppJoin = () => {
    const message = encodeURIComponent(`Hi! I just registered for Kishan's workshop and would like to join the WhatsApp group!`);
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  if (success) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="glass-card p-8 rounded-2xl text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-green-400 text-2xl"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-gray-300 mb-6">
              You've successfully secured your spot in the workshop! We'll send you all the details soon.
            </p>
            
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppJoin}
                className="w-full py-3 rounded-xl font-semibold bg-green-600 hover:bg-green-700 text-white transition-colors flex items-center justify-center gap-2"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Join WhatsApp Group
              </button>
              
              <button
                onClick={() => setLocation('/')}
                className="btn-primary w-full py-3 rounded-xl font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Workshop Details */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                🚀 Business Mastery Workshop
              </h1>
              <p className="text-gray-300 mb-6">
                Join Kishan Kumar's exclusive workshop and transform your business mindset
              </p>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Spots Filled</span>
                  <span>{100 - spotsLeft}/100</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-primary to-purple-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${100 - spotsLeft}%` }}
                  ></div>
                </div>
                <p className="text-primary font-semibold mt-2">
                  Only {spotsLeft} spots left!
                </p>
              </div>
            </div>

            {/* Workshop Details */}
            <div className="space-y-6 mb-8">
              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-primary"></i>
                  Workshop Details
                </h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• <strong>Date:</strong> December 15th, 2024</li>
                  <li>• <strong>Time:</strong> 7:00 PM - 9:00 PM IST</li>
                  <li>• <strong>Format:</strong> Live Online Workshop</li>
                  <li>• <strong>Duration:</strong> 2 Hours + Q&A</li>
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-star text-primary"></i>
                  What You'll Learn
                </h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Business Strategy & Scaling Techniques</li>
                  <li>• Digital Marketing & Brand Building</li>
                  <li>• Financial Management & Investment</li>
                  <li>• Networking & Relationship Building</li>
                  <li>• Mindset & Leadership Skills</li>
                </ul>
              </div>

              <div className="bg-white/5 p-4 rounded-xl">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                  <i className="fas fa-gift text-primary"></i>
                  Bonuses (Worth ₹50,000+)
                </h3>
                <ul className="text-gray-300 space-y-2 text-sm">
                  <li>• Exclusive WhatsApp Community Access</li>
                  <li>• Workshop Recording & Resources</li>
                  <li>• 1-on-1 Q&A Session</li>
                  <li>• Business Templates & Tools</li>
                  <li>• Networking with Like-minded Entrepreneurs</li>
                </ul>
              </div>
            </div>

            {/* Recent Registrations */}
            <div className="bg-white/5 p-4 rounded-xl">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <i className="fas fa-users text-primary"></i>
                Recent Registrations
              </h3>
              <div className="space-y-2">
                {recentRegistrations.map((reg, index) => (
                  <div key={index} className="flex justify-between items-center text-sm">
                    <span className="text-gray-300">
                      <span className="text-white font-medium">{reg.name}</span> ({reg.profession})
                    </span>
                    <span className="text-gray-400">{reg.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="glass-card p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                Reserve Your Spot
              </h2>
              <p className="text-gray-300">
                Join the exclusive workshop and transform your business
              </p>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-4 rounded-xl mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label className="block text-white font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">
                  What do you do?
                </label>
                <select
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select your profession</option>
                  <option value="Student">Student</option>
                  <option value="Entrepreneur">Entrepreneur</option>
                  <option value="Business Owner">Business Owner</option>
                  <option value="Freelancer">Freelancer</option>
                  <option value="Employee">Employee</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Investor">Investor</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i>
                      Processing...
                    </span>
                  ) : (
                    'Reserve My Spot'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={() => setLocation('/')}
                  className="w-full py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/10 transition-colors"
                >
                  Back to Home
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
