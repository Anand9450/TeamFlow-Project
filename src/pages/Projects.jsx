import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Plus, MoreVertical, FolderKanban, Users, Calendar } from 'lucide-react';

const Projects = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [showModal, setShowModal] = useState(false);

  // Mock projects
  const [projects] = useState([
    { id: 1, name: 'Website Redesign', desc: 'Revamp the corporate website with new branding', progress: 75, members: 4, dueDate: 'Oct 30' },
    { id: 2, আন্ত: 'Mobile App V2', desc: 'React Native app for both iOS and Android', progress: 30, members: 6, dueDate: 'Nov 15' },
    { id: 3, name: 'Marketing Campaign', desc: 'Q4 social media and email marketing assets', progress: 90, members: 3, dueDate: 'Oct 15' },
  ]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-500 mt-1">Manage and track your team's projects.</p>
        </div>
        
        {isAdmin && (
          <button 
            onClick={() => setShowModal(true)}
            className="flex items-center justify-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl font-medium hover:bg-primary-700 transition-colors shadow-sm"
          >
            <Plus size={18} />
            New Project
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
                  <FolderKanban size={20} />
                </div>
                <button className="text-gray-400 hover:text-gray-700 p-1">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name || project.আন্ত}</h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-6">{project.desc}</p>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Progress</span>
                  <span className="text-primary-600 font-bold">{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-primary-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${project.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(project.members, 4))].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-purple-400 to-primary-500 flex items-center justify-center text-white text-xs font-bold">
                      U{i+1}
                    </div>
                  ))}
                  {project.members > 4 && (
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-gray-600 text-xs font-bold">
                      +{project.members - 4}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                  <Calendar size={14} />
                  {project.dueDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - only rendered if showModal is true */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold">Create New Project</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-700 text-2xl leading-none">&times;</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                <input type="text" className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="E.g. Website Redesign" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-24 resize-none" placeholder="Project details..."></textarea>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors">Cancel</button>
                <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">Create Project</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
