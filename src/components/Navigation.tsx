import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, CheckSquare, Moon, Sun } from 'lucide-react';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-around py-2">
          <NavItem 
            icon={<Home size={24} />} 
            label="Accueil" 
            active={location.pathname === '/'} 
            onClick={() => navigate('/')}
          />
          <NavItem 
            icon={<BookOpen size={24} />} 
            label="Cours" 
            active={location.pathname === '/courses'} 
            onClick={() => navigate('/courses')}
          />
          <NavItem 
            icon={<CheckSquare size={24} />} 
            label="To-Do" 
            active={location.pathname === '/todo'} 
            onClick={() => navigate('/todo')}
          />
          <button
            onClick={toggleDarkMode}
            className="flex flex-col items-center p-2"
          >
            {darkMode ? <Sun size={24} className="text-gray-400" /> : <Moon size={24} className="text-gray-400" />}
            <span className="text-xs mt-1 text-gray-500">Theme</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, active = false, onClick }: NavItemProps) {
  return (
    <button 
      className={`flex flex-col items-center p-2 ${active ? 'text-orange-500' : 'text-gray-400'}`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

export default Navigation;