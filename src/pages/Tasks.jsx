import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, Search, Filter, MessageSquare, Clock, AlertCircle, CheckCircle2, User } from 'lucide-react';

const Tasks = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('All');

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design Database Schema', project: 'Backend API', assignee: 'John Doe', status: 'Todo', priority: 'High', due: '2026-05-02', comments: 3 },
    { id: 2, title: 'Implement JWT Auth', project: 'Backend API', assignee: 'Jane Smith', status: 'In Progress', priority: 'Medium', due: '2026-05-01', comments: 1 },
    { id: 3, title: 'Update dependencies', project: 'Frontend', assignee: 'Alex', status: 'Completed', priority: 'Low', due: '2026-04-29', comments: 0 },
    { id: 4, title: 'Fix mobile responsiveness', project: 'Website Redesign', assignee: 'Sarah', status: 'Todo', priority: 'High', due: '2026-04-28', comments: 5 }, // Overdue
  ]);

  const tabs = ['All', 'My Tasks', 'Todo', 'In Progress', 'Completed'];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-500 bg-red-50';
      case 'Medium': return 'text-yellow-500 bg-yellow-50';
      case 'Low': return 'text-green-500 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const isOverdue = (dateString, status) => {
    if (status === 'Completed') return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (activeTab === 'All') return true;
    if (activeTab === 'My Tasks') return task.assignee === user?.name || task.assignee === 'John Doe'; // Mock matching
    return task.status === activeTab;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tasks</h1>
          <p className="text-gray-500 mt-1">Manage and track all project tasks.</p>
        </div>
        
        {isAdmin && (
          <button className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm">
            <Plus size={18} />
            New Task
          </button>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 shrink-0">
        <div className="flex overflow-x-auto w-full md:w-auto hide-scrollbar gap-1 p-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                activeTab === tab 
                  ? 'bg-primary-50 text-primary-700 shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 w-full md:w-auto px-2 md:px-0">
          <div className="relative flex-1 md:w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input type="text" placeholder="Search tasks..." className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <button className="p-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center bg-white shadow-sm">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Tasks List */}
      <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100 text-sm text-gray-500 font-medium">
                <th className="p-4 w-8"></th>
                <th className="p-4">Task Name</th>
                <th className="p-4">Project</th>
                <th className="p-4">Assignee</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Priority</th>
                <th className="p-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => {
                  const overdue = isOverdue(task.due, task.status);
                  return (
                    <tr key={task.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="p-4">
                        <button 
                          onClick={() => handleStatusChange(task.id, task.status === 'Completed' ? 'Todo' : 'Completed')}
                          className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                            task.status === 'Completed' ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-primary-500'
                          }`}
                        >
                          {task.status === 'Completed' && <CheckCircle2 size={14} className="text-white" />}
                        </button>
                      </td>
                      <td className="p-4">
                        <div className={`font-medium ${task.status === 'Completed' ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                          {task.title}
                        </div>
                        {task.comments > 0 && (
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MessageSquare size={12} /> {task.comments}
                          </div>
                        )}
                      </td>
                      <td className="p-4 text-sm text-gray-600">{task.project}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-xs font-bold">
                            {task.assignee.charAt(0)}
                          </div>
                          <span className="text-sm text-gray-700">{task.assignee}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`flex items-center gap-1 text-sm font-medium ${overdue ? 'text-red-600' : 'text-gray-600'}`}>
                          {overdue ? <AlertCircle size={14} /> : <Clock size={14} />}
                          {task.due}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <select 
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className={`text-xs font-bold px-2 py-1.5 rounded-lg border appearance-none text-center cursor-pointer outline-none focus:ring-2 focus:ring-primary-500/20 ${getStatusColor(task.status)}`}
                        >
                          <option value="Todo">Todo</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2">
                        <CheckCircle2 size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium text-gray-900">No tasks found</p>
                      <p className="text-sm">We couldn't find any tasks matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
