import React from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  TrendingUp,
  MoreVertical,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Mock data
  const stats = [
    { label: 'Total Tasks', value: '24', icon: <CheckCircle2 size={24} className="text-blue-500" />, bg: 'bg-blue-50' },
    { label: 'In Progress', value: '12', icon: <Clock size={24} className="text-yellow-500" />, bg: 'bg-yellow-50' },
    { label: 'Overdue', value: '3', icon: <AlertCircle size={24} className="text-red-500" />, bg: 'bg-red-50' },
    { label: 'Completed', value: '9', icon: <TrendingUp size={24} className="text-green-500" />, bg: 'bg-green-50' },
  ];

  const recentTasks = [
    { id: 1, title: 'Update homepage copy', project: 'Website Redesign', status: 'In Progress', due: 'Today' },
    { id: 2, title: 'Fix navigation bug', project: 'Mobile App', status: 'Todo', due: 'Tomorrow' },
    { id: 3, title: 'Prepare Q3 presentation', project: 'Marketing', status: 'Completed', due: 'Yesterday' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your projects today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${stat.bg} flex items-center justify-center`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Recent Tasks</h2>
            <button className="text-sm text-primary-600 font-medium hover:text-primary-700">View All</button>
          </div>
          <div className="divide-y divide-gray-100">
            {recentTasks.map(task => (
              <div key={task.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 w-5 h-5 rounded border flex items-center justify-center ${
                    task.status === 'Completed' ? 'bg-green-500 border-green-500' : 'border-gray-300'
                  }`}>
                    {task.status === 'Completed' && <CheckCircle2 size={14} className="text-white" />}
                  </div>
                  <div>
                    <h3 className={`font-medium ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{task.project}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center text-sm text-gray-500 gap-1">
                    <Calendar size={14} />
                    {task.due}
                  </div>
                  <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md opacity-0 group-hover:opacity-100 transition-all">
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Activity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Activity</h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== 2 && <div className="absolute left-4 top-10 bottom-0 w-px bg-gray-200"></div>}
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-sm z-10 shrink-0 border-2 border-white">
                    S
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 font-medium">Sarah completed a task</p>
                    <p className="text-sm text-gray-500">Update homepage copy</p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
