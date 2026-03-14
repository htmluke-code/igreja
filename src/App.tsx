import { useState, useEffect, useCallback } from 'react';
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

const VALID_PAGES = ['home', 'bible', 'stories', 'churches', 'apoio', 'movies', 'admin'] as const;
type PageType = typeof VALID_PAGES[number];

function readHash(): PageType {
  try {
    const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (raw && VALID_PAGES.includes(raw as PageType)) {
      return raw as PageType;
    }
  } catch (_) {}
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(() => readHash());

  // Listen for hash changes (back/forward buttons, manual URL change)
  useEffect(() => {
    const handleHashChange = () => {
      const page = readHash();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);

    // Also read on mount in case the initial read missed it
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  const navigateTo = useCallback((page: string) => {
    const validPage = VALID_PAGES.includes(page as PageType) ? page as PageType : 'home';
    
    // Update hash in URL
    if (window.location.hash !== `#${validPage}`) {
      window.location.hash = validPage;
    }
    
    // Immediately update state (don't wait for hashchange event)
    setCurrentPage(validPage);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'bible': return <BibleReader onNavigate={navigateTo} />;
      case 'stories': return <StoriesPage onNavigate={navigateTo} />;
      case 'churches': return <ChurchesPage onNavigate={navigateTo} />;
      case 'apoio': return <ApoioPage onNavigate={navigateTo} />;
      case 'movies': return <MoviesPage onNavigate={navigateTo} />;
      case 'admin': return <AdminPage onNavigate={navigateTo} />;
      default: return <HomePage onNavigate={navigateTo} />;
    }
  };

  const isAdmin = currentPage === 'admin';

  return (
    <DataProvider>
      <div className="min-h-screen bg-sacred-900">
        {!isAdmin && <Navbar currentPage={currentPage} onNavigate={navigateTo} />}
        <main>{renderPage()}</main>
        {!isAdmin && <ChatWidget />}
      </div>
    </DataProvider>
  );
}
