import { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader } from '../../components/common/Card';
import { SimpleBarChart } from '../../components/common/Charts';
import { Users, User, Briefcase, FileText, BrainCircuit, Clock, Plus, BarChart2, CheckCircle, AlertCircle, Database, Server, Shield, Cpu, Loader2, Settings, Activity, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../../context/AuthContext';

// Helper to format relative time
const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }
  if (diffInSeconds < 172800) return 'Yesterday';
  const days = Math.floor(diffInSeconds / 86400);
  return `${days} days ago`;
};

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [dateRange, setDateRange] = useState('all_time');

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(false);
    try {
      const res = await api.get(`/admin/dashboard-stats?range=${dateRange}`);
      setData(res.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = () => {
    if (!data?.stats) return;
    const { stats } = data;
    const csvContent = [
      ['Metric', 'Value'],
      ['Total Users', stats.totalUsers || 0],
      ['New Users', stats.newUsers || 0],
      ['Total Jobs', stats.totalJobs || 0],
      ['New Jobs', stats.newJobs || 0],
      ['Applications', stats.applications || 0],
      ['AI Analyses', stats.aiAnalyses || 0]
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `platform_overview_${dateRange}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange]);

  
  if (error) {
    return (
      <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">Unable to load dashboard data.</h3>
        <button onClick={fetchDashboardData} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">Retry</button>
      </div>
    );
  }

  const { stats, chartData, systemHealth, recentActivity } = data || {};

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center flex-wrap gap-4 sticky top-16 z-20 bg-gray-50 pt-2 pb-4 -mt-2 border-b-2 border-transparent">
        <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        <div className="flex gap-2 relative">
          <select 
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            disabled={loading}
            className="px-3 py-1.5 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 cursor-pointer"
          >
            <option value="all_time">All Time</option>
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="this_year">This Year</option>
          </select>
          <button
            onClick={exportCSV}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>
      
      {/* KPI Section */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 relative transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        <KPICard icon={<Users />} label="Total Users" value={(stats?.totalUsers || 0).toLocaleString()} />
        <KPICard icon={<Users className="text-blue-600 group-hover:text-white transition-colors" />} label="New Users" value={(stats?.newUsers || 0).toLocaleString()} trend={stats?.newUsersGrowth} />
        <KPICard icon={<Briefcase />} label="Total Jobs" value={(stats?.totalJobs || 0).toLocaleString()} />
        <KPICard icon={<Briefcase />} label="New Jobs" value={(stats?.newJobs || 0).toLocaleString()} trend={stats?.newJobsGrowth} />
        <KPICard icon={<FileText className="text-green-600 group-hover:text-white transition-colors" />} label="Applications" value={(stats?.applications || 0).toLocaleString()} trend={stats?.applicationsGrowth} />
        <KPICard icon={<Cpu />} label="AI Analyses" value={(stats?.aiAnalyses || 0).toLocaleString()} />
      </div>

      <div className={`grid lg:grid-cols-3 gap-6 transition-opacity duration-300 ${loading ? 'opacity-60 pointer-events-none' : 'opacity-100'}`}>
        {/* Main Chart */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2 flex-wrap gap-2">
              <h3 className="font-bold text-lg text-gray-800">Platform Activity</h3>
            </CardHeader>
            <CardBody className="pt-0 relative min-h-[250px]">
              {chartData?.length > 0 ? (
                <SimpleBarChart data={chartData} height={250} />
              ) : (
                <div className="h-[250px] flex items-center justify-center text-gray-400">
                  No activity data for this period
                </div>
              )}
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader><h3 className="font-bold text-lg text-gray-800">Quick Actions</h3></CardHeader>
            <CardBody>
              <div className="grid grid-cols-4 gap-3">
                <QuickAction icon={<Plus className="w-5 h-5" />} label="Add User" to="/admin/users" state={{ openAddModal: true }} />
                <QuickAction icon={<Briefcase className="w-5 h-5" />} label="Manage Jobs" to="/admin/jobs" />
                <QuickAction icon={<Activity className="w-5 h-5" />} label="View Activity" to="/admin/activity" />
                <QuickAction icon={<Settings className="w-5 h-5" />} label="System Settings" to="/admin/settings" />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Right Sidebar: Health & Activity */}
        <div className="space-y-6">
          <Card>
            <CardHeader><h3 className="font-bold text-lg text-gray-800">System Health</h3></CardHeader>
            <CardBody className="space-y-4">
              {systemHealth?.length > 0 ? systemHealth.map((health, idx) => (
                <HealthItem key={idx} name={health.service} status={health.status} latency={health.latency} icon={
                  health.service.includes('API') ? <Server className="h-4 w-4" /> :
                  health.service.includes('Database') ? <Database className="h-4 w-4" /> :
                  health.service.includes('Auth') ? <Shield className="h-4 w-4" /> :
                  <Cpu className="h-4 w-4" />
                } />
              )) : (
                <p className="text-sm text-gray-500 italic">Health status unavailable</p>
              )}
            </CardBody>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
              <Link to="/admin/activity" className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</Link>
            </CardHeader>
            <CardBody className="space-y-4">
              {recentActivity?.length > 0 ? recentActivity.map((act, idx) => {
                const isUsers = act.module === 'Users';
                const isJobs = act.module === 'Jobs';
                const isApps = act.module === 'Applications';
                const isAI = act.module === 'Resume Analyses';
                const isProfiles = act.module === 'Profile Updates';
                
                return (
                  <div key={idx} className="flex gap-3 items-start">
                    <div className={`p-2 rounded-full mt-1 shrink-0 ${
                      isUsers ? 'bg-blue-100 text-blue-600' :
                      isJobs ? 'bg-green-100 text-green-600' :
                      isApps ? 'bg-purple-100 text-purple-600' :
                      isAI ? 'bg-slate-100 text-slate-600' :
                      isProfiles ? 'bg-pink-100 text-pink-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {isUsers && <Users className="h-4 w-4" />}
                      {isJobs && <Briefcase className="h-4 w-4" />}
                      {isApps && <FileText className="h-4 w-4" />}
                      {isAI && <Cpu className="h-4 w-4" />}
                      {isProfiles && <User className="h-4 w-4" />}
                      {!isUsers && !isJobs && !isApps && !isAI && !isProfiles && <Activity className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm text-gray-800 font-medium leading-tight">
                        {act.user_name} <span className="font-normal text-gray-600 ml-1">{act.action}</span>
                      </p>
                      <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock className="h-3 w-3" /> {formatRelativeTime(act.timestamp)}</p>
                    </div>
                  </div>
                );
              }) : (
                <div className="text-center py-4 text-gray-500 text-sm italic">
                  No recent activity
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ icon, label, value, trend }) => (
  <Card className="hover:border-blue-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
    <CardBody className="p-4 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 bg-gray-50 rounded-lg text-gray-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">{icon}</div>
        {trend && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.startsWith('-') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {trend}
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-extrabold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
      </div>
    </CardBody>
  </Card>
);

const HealthItem = ({ name, status, latency, icon }) => {
  const isOnline = status === 'Operational' || status === 'Online';

  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-100">
      <div className="flex items-center gap-2">
        <div className="text-gray-500 shrink-0">{icon}</div>
        <span className="font-medium text-sm text-gray-700 leading-tight">{name}</span>
      </div>
      <div className="text-right">
        <div className="flex items-center justify-between w-[95px] mb-1 ml-auto">
          {isOnline ? <CheckCircle className="w-4 h-4 shrink-0 text-green-500" /> : <AlertCircle className="w-4 h-4 shrink-0 text-amber-500" />}
          <span className={`text-right text-xs font-bold leading-tight ${isOnline ? 'text-green-700' : 'text-amber-500'}`}>
            {status}
          </span>
        </div>
        <p className="text-xs text-gray-400">
          {latency} • just now
        </p>
      </div>
    </div>
  );
};

const QuickAction = ({ icon, label, to, state }) => (
  <Link to={to} state={state} className="flex flex-col items-center justify-center py-3 px-2 bg-gray-50 rounded-lg border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-colors group h-full">
    <div className="text-gray-400 group-hover:text-blue-600 mb-1.5 flex items-center justify-center">{icon}</div>
    <span className="text-xs font-medium text-gray-700 text-center group-hover:text-blue-700 leading-tight">{label}</span>
  </Link>
);
