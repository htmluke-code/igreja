import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import BibleReader from './components/BibleReader';
import StoriesPage from './components/StoriesPage';
import ChurchesPage from './components/ChurchesPage';
import ApoioPage from './components/ApoioPage';
import MoviesPage from './components/MoviesPage';
import AdminPage from './components/AdminPage';
import ChatWidget from './components/ChatWidget';
import { DataProvider } from './contexts/DataContext';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      setCurrentPage(hash);
    };
    window.addEventListener('popstate', handlePopState);
    
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) setCurrentPage(initialHash);
    
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    window.location.hash = currentPage;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'bible':
        return <BibleReader onNavigate={navigateTo} />;
      case 'stories':
        return <StoriesPage onNavigate={navigateTo} />;
      case 'churches':
        return <ChurchesPage onNavigate={navigateTo} />;
      case 'apoio':
        return <ApoioPage onNavigate={navigateTo} />;
      case 'movies':
        return <MoviesPage onNavigate={navigateTo} />;
      case 'admin':
        return <AdminPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  const isAdmin = currentPage === 'admin';

  return (
    <DataProvider>
      <div className="min-h-screen bg-sacred-900">
        {!isAdmin && <Navbar currentPage={currentPage} onNavigate={navigateTo} />}
        <main>
          {renderPage()}
        </main>
        {!isAdmin && <ChatWidget />}
      </div>
    </DataProvider>
  );
}
