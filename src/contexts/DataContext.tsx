import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import {
  type Movie, type Story, type Church,
  getMovies, createMovie as apiCreateMovie, updateMovie, deleteMovie,
  getStories, createStory as apiCreateStory, updateStory, deleteStory,
  getChurches, createChurch as apiCreateChurch, updateChurch, deleteChurch,
} from '../services/api';

interface DataContextType {
  movies: Movie[];
  stories: Story[];
  churches: Church[];
  loading: boolean;
  refreshAll: () => Promise<void>;
  createMovie: (m: Omit<Movie, 'id'>) => Promise<void>;
  editMovie: (id: string, m: Partial<Movie>) => Promise<void>;
  removeMovie: (id: string) => Promise<void>;
  createStory: (s: Omit<Story, 'id'>) => Promise<void>;
  editStory: (id: string, s: Partial<Story>) => Promise<void>;
  removeStory: (id: string) => Promise<void>;
  createChurch: (c: Omit<Church, 'id'>) => Promise<void>;
  editChurch: (id: string, c: Partial<Church>) => Promise<void>;
  removeChurch: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [stories, setStories] = useState<Story[]>([]);
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshAll = useCallback(async () => {
    setLoading(true);
    const [m, s, c] = await Promise.all([getMovies(), getStories(), getChurches()]);
    setMovies(m);
    setStories(s);
    setChurches(c);
    setLoading(false);
  }, []);

  useEffect(() => { refreshAll(); }, [refreshAll]);

  const handleCreateMovie = async (m: Omit<Movie, 'id'>) => { await apiCreateMovie(m); await refreshAll(); };
  const handleEditMovie = async (id: string, m: Partial<Movie>) => { await updateMovie(id, m); await refreshAll(); };
  const handleRemoveMovie = async (id: string) => { await deleteMovie(id); await refreshAll(); };

  const handleCreateStory = async (s: Omit<Story, 'id'>) => { await apiCreateStory(s); await refreshAll(); };
  const handleEditStory = async (id: string, s: Partial<Story>) => { await updateStory(id, s); await refreshAll(); };
  const handleRemoveStory = async (id: string) => { await deleteStory(id); await refreshAll(); };

  const handleCreateChurch = async (c: Omit<Church, 'id'>) => { await apiCreateChurch(c); await refreshAll(); };
  const handleEditChurch = async (id: string, c: Partial<Church>) => { await updateChurch(id, c); await refreshAll(); };
  const handleRemoveChurch = async (id: string) => { await deleteChurch(id); await refreshAll(); };

  return (
    <DataContext.Provider value={{
      movies, stories, churches, loading, refreshAll,
      createMovie: handleCreateMovie, editMovie: handleEditMovie, removeMovie: handleRemoveMovie,
      createStory: handleCreateStory, editStory: handleEditStory, removeStory: handleRemoveStory,
      createChurch: handleCreateChurch, editChurch: handleEditChurch, removeChurch: handleRemoveChurch,
    }}>
      {children}
    </DataContext.Provider>
  );
}
