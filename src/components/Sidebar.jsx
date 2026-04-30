import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, CheckSquare, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user } = useAuth();
  
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Projects', path: '/projects', icon: <FolderKanban size={20} /> },
    { name: 'Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col shadow-sm relative z-10">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white">
            <CheckSquare size={18} strokeWidth={3} />
          </div>
          TeamFlow
        </div>
      </div>
      
      <div className="flex-1 py-6 px-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                isActive
                  ? 'bg-primary-50 text-primary-700 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
          <div className="text-sm font-medium text-gray-900">{user?.name || 'User'}</div>
          <div className="text-xs text-gray-500 capitalize">{user?.role || 'member'}</div>
          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500 cursor-pointer hover:text-gray-900 transition-colors">
            <Settings size={14} />
            Settings
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
