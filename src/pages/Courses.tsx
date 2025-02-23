import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, BookOpen, Star, BarChart2, Clock, Brain } from 'lucide-react';
import Navigation from '../components/Navigation';

interface Course {
  id: string;
  title: string;
  subject: string;
  progress: number;
  priority: boolean;
  nextReview: string;
  image: string;
}

const COURSES: Course[] = [
  {
    id: '1',
    title: 'Algèbre Linéaire',
    subject: 'Mathématiques',
    progress: 75,
    priority: true,
    nextReview: 'Aujourd\'hui',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    title: 'Révolution Française',
    subject: 'Histoire',
    progress: 45,
    priority: false,
    nextReview: 'Demain',
    image: 'https://images.unsplash.com/photo-1582034986517-30d163b1b9b3?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    title: 'Mécanique Quantique',
    subject: 'Physique',
    progress: 30,
    priority: true,
    nextReview: 'Dans 3 jours',
    image: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&q=80&w=400'
  }
];

function Courses() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'priority' | 'review'>('all');

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'priority') return matchesSearch && course.priority;
    if (activeFilter === 'review') return matchesSearch && course.nextReview === 'Aujourd\'hui';
    return matchesSearch;
  });

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Search and Filters */}
      <div className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
        <div className="max-w-2xl mx-auto p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Rechercher un cours..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              icon={<BookOpen size={18} />}
              label="Tous"
            />
            <FilterButton
              active={activeFilter === 'priority'}
              onClick={() => setActiveFilter('priority')}
              icon={<Star size={18} />}
              label="Prioritaires"
            />
            <FilterButton
              active={activeFilter === 'review'}
              onClick={() => setActiveFilter('review')}
              icon={<Brain size={18} />}
              label="À réviser"
            />
          </div>
        </div>
      </div>

      {/* Course List */}
      <div className="pt-36 pb-24 px-4 max-w-2xl mx-auto">
        <div className="grid gap-4">
          {filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => navigate(`/courses/${course.id}`)}
            />
          ))}
        </div>
      </div>

      <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
        ${active 
          ? 'bg-orange-500 text-white' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700 transition-transform hover:scale-[1.02] cursor-pointer"
    >
      <div className="h-32 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg dark:text-white">{course.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{course.subject}</p>
          </div>
          {course.priority && (
            <span className="bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <Star size={12} />
              Prioritaire
            </span>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-gray-400" />
            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-orange-500 h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">{course.progress}%</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Clock size={16} />
            <span>Prochaine révision: {course.nextReview}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Courses;