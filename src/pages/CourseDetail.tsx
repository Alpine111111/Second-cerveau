import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Brain, 
  PlayCircle, 
  BookOpen, 
  MessageSquare,
  ChevronLeft,
  Star,
  BarChart2,
  Clock
} from 'lucide-react';
import Navigation from '../components/Navigation';

const COURSE = {
  id: '1',
  title: 'Algèbre Linéaire',
  subject: 'Mathématiques',
  progress: 75,
  priority: true,
  nextReview: 'Aujourd\'hui',
  image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=400',
  description: 'Cours approfondi sur l\'algèbre linéaire, couvrant les espaces vectoriels, les transformations linéaires, et les applications pratiques.',
  chapters: [
    {
      id: '1',
      title: 'Espaces Vectoriels',
      progress: 100,
      duration: '45 min'
    },
    {
      id: '2',
      title: 'Transformations Linéaires',
      progress: 80,
      duration: '30 min'
    },
    {
      id: '3',
      title: 'Valeurs Propres',
      progress: 50,
      duration: '40 min'
    }
  ]
};

function CourseDetail() {
  const { id } = useParams();
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'quiz' | 'ai'>('content');

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-white'}`}>
      {/* Course Header */}
      <div 
        className="h-64 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${COURSE.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80" />
        <div className="absolute inset-0 p-4 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm text-white">
              <ChevronLeft size={24} />
            </button>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                {COURSE.subject}
              </span>
              {COURSE.priority && (
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} />
                  Prioritaire
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">{COURSE.title}</h1>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <BarChart2 size={16} />
                <span>{COURSE.progress}% complété</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>Révision: {COURSE.nextReview}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex gap-4">
            <TabButton
              active={activeTab === 'content'}
              onClick={() => setActiveTab('content')}
              icon={<BookOpen size={20} />}
              label="Contenu"
            />
            <TabButton
              active={activeTab === 'quiz'}
              onClick={() => setActiveTab('quiz')}
              icon={<Brain size={20} />}
              label="Quiz"
            />
            <TabButton
              active={activeTab === 'ai'}
              onClick={() => setActiveTab('ai')}
              icon={<MessageSquare size={20} />}
              label="AI Tutor"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto p-4 pb-24">
        {activeTab === 'content' && (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              {COURSE.description}
            </p>
            <div className="space-y-2">
              {COURSE.chapters.map(chapter => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="bg-orange-50 dark:bg-gray-800 rounded-xl p-6 text-center">
            <Brain size={48} className="mx-auto mb-4 text-orange-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Mode Quiz</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Testez vos connaissances avec des questions générées par l'IA
            </p>
            <button className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition-colors">
              Commencer le Quiz
            </button>
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <MessageSquare size={24} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold dark:text-white">Assistant IA</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Posez vos questions sur le cours d'Algèbre Linéaire
                </p>
                <input
                  type="text"
                  placeholder="Votre question..."
                  className="w-full mt-4 p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <Navigation darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
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

interface Chapter {
  id: string;
  title: string;
  progress: number;
  duration: string;
}

function ChapterCard({ chapter }: { chapter: Chapter }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium dark:text-white">{chapter.title}</h3>
        <PlayCircle size={20} className="text-orange-500" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-orange-500 h-2 rounded-full"
              style={{ width: `${chapter.progress}%` }}
            />
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400">{chapter.progress}%</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Clock size={16} />
          <span>{chapter.duration}</span>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;