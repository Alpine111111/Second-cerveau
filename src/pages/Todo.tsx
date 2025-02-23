import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  AlertCircle,
  Tag,
  Calendar,
  BarChart,
  Plus,
  Timer,
  Layers,
  ChevronRight,
  Star
} from 'lucide-react';
import Navigation from '../components/Navigation';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  category: string;
  completed: boolean;
  progress: number;
}

interface Project {
  id: string;
  title: string;
  tasks: number;
  completed: number;
  dueDate: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Révision Algèbre Linéaire',
    description: 'Chapitre 3: Transformations Linéaires',
    priority: 'high',
    dueDate: '2024-03-20',
    category: 'Études',
    completed: false,
    progress: 30
  },
  {
    id: '2',
    title: 'Projet Histoire - Révolution',
    description: 'Recherche et analyse des causes',
    priority: 'medium',
    dueDate: '2024-03-22',
    category: 'Projets',
    completed: false,
    progress: 60
  }
];

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Révision Examens',
    tasks: 8,
    completed: 3,
    dueDate: '2024-03-25'
  },
  {
    id: '2',
    title: 'Dissertation Histoire',
    tasks: 5,
    completed: 2,
    dueDate: '2024-03-28'
  }
];

function Todo() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<'tasks' | 'projects'>('tasks');
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold dark:text-white">Tâches & Projets</h1>
            {activeTab === 'tasks' && (
              <button 
                onClick={() => setPomodoroActive(!pomodoroActive)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${pomodoroActive 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300'
                  }`}
              >
                <Timer size={18} />
                {pomodoroActive ? formatTime(pomodoroTime) : 'Pomodoro'}
              </button>
            )}
          </div>
          
          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700">
            <TabButton
              active={activeTab === 'tasks'}
              onClick={() => setActiveTab('tasks')}
              icon={<CheckSquare size={18} />}
              label="Tâches"
            />
            <TabButton
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
              icon={<Layers size={18} />}
              label="Projets"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-36 pb-24 px-4 max-w-2xl mx-auto">
        {activeTab === 'tasks' ? (
          <div className="space-y-4">
            {tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={() => toggleTaskCompletion(task.id)}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {PROJECTS.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Add Button */}
      <button 
        className="fixed right-4 bottom-24 bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-lg transition-transform hover:scale-105"
        onClick={() => {/* TODO: Implement add task/project modal */}}
      >
        <Plus size={24} />
      </button>

      {/* Productivity Stats */}
      <div className="fixed bottom-24 left-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <BarChart size={18} className="text-orange-500" />
          <span>8 tâches aujourd'hui</span>
        </div>
      </div>
    </div>
  );
}

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function TabButton({ active, onClick, icon, label }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors
        ${active 
          ? 'border-orange-500 text-orange-500' 
          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface TaskCardProps {
  task: Task;
  onToggle: () => void;
}

function TaskCard({ task, onToggle }: TaskCardProps) {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 transition-all
      ${task.completed ? 'opacity-75' : ''}`}>
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={onToggle}
          className="mt-1 w-5 h-5 rounded-full border-2 border-orange-500 text-orange-500 focus:ring-orange-500"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : 'dark:text-white'}`}>
              {task.title}
            </h3>
            <span className={`px-2 py-1 rounded-full text-xs text-white ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar size={16} />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag size={16} />
              <span>{task.category}</span>
            </div>
          </div>
          {/* Progress Bar */}
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{task.progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium dark:text-white">{project.title}</h3>
        <ChevronRight size={20} className="text-gray-400" />
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <CheckSquare size={16} />
            <span>{project.completed}/{project.tasks} tâches</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Échéance: {new Date(project.dueDate).toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${(project.completed / project.tasks) * 100}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((project.completed / project.tasks) * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export default Todo;