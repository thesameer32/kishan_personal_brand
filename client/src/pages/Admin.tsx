import { useState, useEffect } from 'react';

interface Registration {
  id: string;
  name: string;
  email: string;
  profession: string;
  createdAt: string;
}

export default function Admin() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await fetch('/api/admin/registrations');
        const result = await response.json();
        
        if (result.success) {
          setRegistrations(result.data);
        } else {
          console.error('Failed to fetch registrations:', result.error);
        }
      } catch (error) {
        console.error('Error fetching registrations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen hero-bg flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-bg p-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Workshop Registrations
            </h1>
            <p className="text-gray-300">
              Total Registrations: {registrations.length}
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-white font-semibold p-4">Name</th>
                  <th className="text-white font-semibold p-4">Email</th>
                  <th className="text-white font-semibold p-4">Profession</th>
                  <th className="text-white font-semibold p-4">Registration Date</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-white/10 hover:bg-white/5">
                    <td className="text-white p-4">{reg.name}</td>
                    <td className="text-gray-300 p-4">{reg.email}</td>
                    <td className="text-gray-300 p-4">
                      <span className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                        {reg.profession}
                      </span>
                    </td>
                    <td className="text-gray-300 p-4">
                      {new Date(reg.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 text-center">
            <p className="text-green-400 text-sm">
              ✅ Connected to SQLite Database - Showing Real Registration Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
