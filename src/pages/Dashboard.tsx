import React, { useState } from 'react';
import { 
  Home, 
  BookOpen, 
  CheckSquare, 
  Search, 
  Plus, 
  Moon, 
  Sun,
  Zap,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface Task {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Révision Mathématiques', time: '09:00', completed: false },
    { id: '2', title: 'Lecture Histoire', time: '11:30', completed: true },
    { id: '3', title: 'Exercices Physique', time: '14:00', completed: false },
  ]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Search Bar */}
      <div className="fixed top-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-24 px-4 max-w-2xl mx-auto">
        {/* Today's Card */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 mb-6 border border-black/10 dark:border-white/10 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold dark:text-white">Aujourd'hui</h2>
            <div className="bg-orange-500 p-2 rounded-full">
              <Zap size={20} className="text-white" />
            </div>
          </div>
          <div className="space-y-4">
            {tasks.map(task => (
              <Task
                key={task.id}
                {...task}
                onToggle={() => toggleTaskCompletion(task.id)}
              />
            ))}
          </div>
        </div>

        {/* AI Assistant */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
              <MessageSquare size={24} className="text-white" />
            </div>
            <div>
              <h3 className="font-semibold dark:text-white">Assistant IA</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Comment puis-je vous aider aujourd'hui ?
              </p>
            </div>
          </div>
        </div>
      </div>

      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Floating Action Button */}
      <button className="fixed right-4 bottom-24 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105">
        <Plus size={24} />
      </button>
    </div>
  );
}

interface TaskProps extends Task {
  onToggle: () => void;
}

function Task({ title, time, completed, onToggle }: TaskProps) {
  return (
    <div className="flex items-center gap-4 p-3 bg-white dark:bg-gray-700 rounded-lg">
      <input
        type="checkbox"
        checked={completed}
        onChange={onToggle}
        className="w-5 h-5 rounded-full border-2 border-orange-500 text-orange-500 focus:ring-orange-500"
      />
      <div className="flex-1">
        <h3 className={`font-medium ${completed ? 'line-through text-gray-400' : 'dark:text-white'}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{time}</p>
      </div>
    </div>
  );
}

export default Dashboard;