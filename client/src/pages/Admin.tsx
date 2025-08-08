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
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  // Filter registrations by date
  const filteredRegistrations = selectedDate 
    ? registrations.filter(reg => {
        const regDate = new Date(reg.createdAt).toISOString().split('T')[0];
        return regDate === selectedDate;
      })
    : registrations;

  // Calculate statistics
  const totalRegistrations = registrations.length;
  const todayRegistrations = registrations.filter(reg => {
    const today = new Date().toDateString();
    return new Date(reg.createdAt).toDateString() === today;
  }).length;
  
  // Calculate filtered statistics
  const filteredTotal = filteredRegistrations.length;
  const filteredTodayRegistrations = filteredRegistrations.filter(reg => {
    const today = new Date().toDateString();
    return new Date(reg.createdAt).toDateString() === today;
  }).length;
  
  const professionStats = registrations.reduce((acc, reg) => {
    acc[reg.profession] = (acc[reg.profession] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const filteredProfessionStats = filteredRegistrations.reduce((acc, reg) => {
    acc[reg.profession] = (acc[reg.profession] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topProfessions = Object.entries(selectedDate ? filteredProfessionStats : professionStats)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3);

  // Export functionality
  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Profession', 'Registration Date'];
    const csvContent = [
      headers.join(','),
      ...registrations.map(reg => [
        `"${reg.name}"`,
        `"${reg.email}"`,
        `"${reg.profession}"`,
        `"${new Date(reg.createdAt).toLocaleDateString()}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workshop-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(registrations, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workshop-registrations-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchRegistrations();
  };

  useEffect(() => {
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
            <p className="text-gray-300 mb-6">
              Total Registrations: {totalRegistrations}
            </p>
            
            {/* Date Filter */}
            <div className="mb-6">
              <div className="flex flex-wrap justify-center gap-4 items-center">
                <label className="text-white font-medium">Filter by Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-primary"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate('')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
              {selectedDate && (
                <p className="text-center text-gray-300 mt-2">
                  Showing registrations for: {new Date(selectedDate).toLocaleDateString()}
                </p>
              )}
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 p-6 rounded-xl">
                <div className="text-2xl font-bold text-primary mb-2">
                  {selectedDate ? filteredTotal : totalRegistrations}
                </div>
                <div className="text-gray-300 text-sm">
                  {selectedDate ? 'Filtered' : 'Total'} Registrations
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <div className="text-2xl font-bold text-green-400 mb-2">
                  {selectedDate ? filteredTodayRegistrations : todayRegistrations}
                </div>
                <div className="text-gray-300 text-sm">
                  {selectedDate ? 'Filtered' : "Today's"} Registrations
                </div>
              </div>
              <div className="bg-white/10 p-6 rounded-xl">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {Object.keys(selectedDate ? filteredProfessionStats : professionStats).length}
                </div>
                <div className="text-gray-300 text-sm">
                  {selectedDate ? 'Filtered' : 'Unique'} Professions
                </div>
              </div>
            </div>

            {/* Top Professions */}
            {topProfessions.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Top Professions</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {topProfessions.map(([profession, count]) => (
                    <div key={profession} className="bg-primary/20 text-primary px-4 py-2 rounded-full">
                      {profession}: {count}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Export Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <button
                onClick={handleRefresh}
                disabled={refreshing}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className={`fas ${refreshing ? 'fa-spinner fa-spin' : 'fa-sync-alt'}`}></i>
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </button>
              <button
                onClick={exportToCSV}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-download"></i>
                Export CSV
              </button>
              <button
                onClick={exportToJSON}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <i className="fas fa-code"></i>
                Export JSON
              </button>
            </div>
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
                {filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 p-8">
                      {selectedDate 
                        ? `No registrations found for ${new Date(selectedDate).toLocaleDateString()}. Try a different date! 📅`
                        : 'No registrations found. Start promoting your workshop! 🚀'
                      }
                    </td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
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
                  ))
                )}
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
