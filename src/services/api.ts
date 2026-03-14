export interface Movie {
  id: string;
  title: string;
  director: string;
  year: number;
  duration: string;
  rating: number;
  genre: string[];
  description: string;
  image: string;
  trailer: string;
  platforms: string[];
  featured?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  fullText: string;
}

export interface Church {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  yearBuilt: number;
}

// ===== AUTH TOKEN MANAGEMENT =====
let authToken: string | null = null;

const TOKEN_KEY = 'admin_token';
const TOKEN_EXPIRY_KEY = 'admin_token_expiry';
const SESSION_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 horas

export function setAuthToken(token: string) {
  authToken = token;
  try {
    sessionStorage.setItem(TOKEN_KEY, token);
    sessionStorage.setItem(TOKEN_EXPIRY_KEY, String(Date.now() + SESSION_EXPIRY_MS));
  } catch { /* ignore */ }
}

export function getAuthToken(): string | null {
  if (!authToken) {
    try {
      const saved = sessionStorage.getItem(TOKEN_KEY);
      const expiry = sessionStorage.getItem(TOKEN_EXPIRY_KEY);
      if (saved && expiry && Date.now() < Number(expiry)) {
        authToken = saved;
      } else {
        // Expirado — limpar
        sessionStorage.removeItem(TOKEN_KEY);
        sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
        authToken = null;
      }
    } catch {
      authToken = null;
    }
  }
  return authToken;
}

export function clearAuthToken() {
  authToken = null;
  try {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch { /* ignore */ }
}

// ===== LOGIN =====
export async function loginAdmin(password: string): Promise<{ success: boolean; token?: string; error?: string }> {
  try {
    const resp = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await resp.json();
    if (data.success && data.token) {
      setAuthToken(data.token);
      return { success: true, token: data.token };
    }
    return { success: false, error: data.error || 'Senha incorreta' };
  } catch {
    return { success: false, error: 'Servidor indisponível' };
  }
}

// ===== HEADERS =====
function getHeaders(): Record<string, string> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

// ===== FALLBACK DATA — 15 FILMES COMPLETOS =====
const fallbackMovies: Movie[] = [
  {
    id: '1', title: 'A Paixão de Cristo', director: 'Mel Gibson', year: 2004, duration: '2h 7min',
    rating: 9.2, genre: ['Bíblico', 'Drama'],
    description: 'As últimas 12 horas da vida de Jesus Cristo, desde a agonia no Jardim das Oliveiras até a crucificação no Calvário. Um retrato visceral e emocionante do sacrifício supremo.',
    image: 'https://m.media-amazon.com/images/M/MV5BNTAzNzEyMjQwNl5BMl5BanBnXkFtZTcwNTMzMDk4Mg@@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=4Aif1qEB_LM',
    platforms: ['Prime Video', 'Apple TV'], featured: true
  },
  {
    id: '2', title: 'Ben-Hur', director: 'William Wyler', year: 1959, duration: '3h 32min',
    rating: 8.1, genre: ['Épico', 'Drama'],
    description: 'Um príncipe judeu é traído por seu amigo romano e condenado à escravidão. Sua jornada de vingança e redenção culmina em um encontro transformador com Jesus Cristo.',
    image: 'https://m.media-amazon.com/images/M/MV5BNjgxY2JiMDYtZGM4OC00MTlhLTgyMmQtMjlkYTc4YjYxNjRiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=frE9rXnaHpE',
    platforms: ['HBO Max', 'Prime Video']
  },
  {
    id: '3', title: 'Os Dez Mandamentos', director: 'Cecil B. DeMille', year: 1956, duration: '3h 40min',
    rating: 7.9, genre: ['Bíblico', 'Épico'],
    description: 'A vida épica de Moisés — desde seu nascimento no Egito até a libertação do povo hebreu e a revelação dos Dez Mandamentos no Monte Sinai.',
    image: 'https://m.media-amazon.com/images/M/MV5BNjA1NGUwNjgtYzE2YS00ZTcyLTg1ZTAtMWI5ODE1MmQyYWU3XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=mXJkSRCfMHk',
    platforms: ['Paramount+', 'Prime Video']
  },
  {
    id: '4', title: 'O Príncipe do Egito', director: 'Brenda Chapman', year: 1998, duration: '1h 39min',
    rating: 8.0, genre: ['Animação', 'Bíblico'],
    description: 'A história de Moisés contada em animação magistral — do rio Nilo à travessia do Mar Vermelho. Músicas inesquecíveis e visuais deslumbrantes.',
    image: 'https://m.media-amazon.com/images/M/MV5BNzc0NjkxMjYtMDkzMC00YTlhLWFjMDYtZmNiYTczOTQ2N2NiXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=bXsLnZWz6Ts',
    platforms: ['Netflix', 'Prime Video']
  },
  {
    id: '5', title: 'Ressurreição', director: 'Kevin Reynolds', year: 2016, duration: '1h 47min',
    rating: 6.4, genre: ['Bíblico', 'Drama'],
    description: 'Um tribuno romano é encarregado de investigar o desaparecimento do corpo de Jesus após a crucificação. O que ele descobre muda sua vida para sempre.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjEwMTcyODY2M15BMl5BanBnXkFtZTgwNjUxMzc1NzE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=Kl-dSLkCRXo',
    platforms: ['Netflix', 'Prime Video']
  },
  {
    id: '6', title: 'Deus Não Está Morto', director: 'Harold Cronk', year: 2014, duration: '1h 53min',
    rating: 6.9, genre: ['Drama', 'Inspiracional'],
    description: 'Um estudante universitário cristão enfrenta seu professor ateu em um debate público para provar a existência de Deus.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjIxNjA5ODE4Ml5BMl5BanBnXkFtZTgwMjM4NjI4MTE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=fUKk0Rk5aUk',
    platforms: ['Netflix', 'Prime Video']
  },
  {
    id: '7', title: 'A Cabana', director: 'Stuart Hazeldine', year: 2017, duration: '2h 12min',
    rating: 6.7, genre: ['Drama', 'Inspiracional'],
    description: 'Após uma tragédia devastadora, um homem recebe um misterioso convite para se encontrar com Deus em uma cabana abandonada na floresta.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjI4MDJiMmYtMDU4My00NmU3LWE3MzAtNzcxMmNhMjk3NDRhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=PjPCqg8bfRc',
    platforms: ['Prime Video', 'Apple TV']
  },
  {
    id: '8', title: 'Noé', director: 'Darren Aronofsky', year: 2014, duration: '2h 18min',
    rating: 5.7, genre: ['Épico', 'Bíblico'],
    description: 'A épica história de Noé, escolhido por Deus para construir uma arca e salvar os animais de um grande dilúvio que purificará a Terra.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjE1MTkwMDA1Nl5BMl5BanBnXkFtZTgwNTM5NTY4MDE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=_OSaJE56mFs',
    platforms: ['Paramount+', 'Prime Video']
  },
  {
    id: '9', title: 'Paulo, Apóstolo de Cristo', director: 'Andrew Hyatt', year: 2018, duration: '1h 48min',
    rating: 6.3, genre: ['Bíblico', 'Drama'],
    description: 'Os últimos dias do apóstolo Paulo na prisão romana, enquanto Lucas o visita secretamente para registrar seus ensinamentos.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjE1OTc5OTMtYjk5Yy00OTQ5LWJjMjUtNWE1MGY5NDJhNjhhXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=OIaB0SHxrIQ',
    platforms: ['Netflix', 'Prime Video']
  },
  {
    id: '10', title: 'Fátima', director: 'Marco Pontecorvo', year: 2020, duration: '1h 53min',
    rating: 6.1, genre: ['Drama', 'Inspiracional'],
    description: 'A verdadeira história das três crianças pastoras de Fátima, Portugal, que testemunharam aparições da Virgem Maria em 1917.',
    image: 'https://m.media-amazon.com/images/M/MV5BOTI3N2IyMTAtOTIyYi00ZDI5LTk3MTktNjk0ZTcwYmRjNWM1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=bNS3KE-Nb4k',
    platforms: ['Prime Video', 'Apple TV']
  },
  {
    id: '11', title: 'Cabrini', director: 'Alejandro Monteverde', year: 2024, duration: '2h 25min',
    rating: 7.8, genre: ['Drama', 'Inspiracional'],
    description: 'A história inspiradora de Francesca Cabrini, a imigrante italiana que se tornou a primeira santa americana, lutando pelos direitos dos pobres em Nova York.',
    image: 'https://m.media-amazon.com/images/M/MV5BZmNlYjc0YmItMDVhOC00NTRmLTg3NjctMTdlZTVmOGEzMzBiXkEyXkFqcGc@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=nGrSNk2mOQs',
    platforms: ['Cinema', 'Prime Video']
  },
  {
    id: '12', title: 'Êxodo: Deuses e Reis', director: 'Ridley Scott', year: 2014, duration: '2h 30min',
    rating: 6.0, genre: ['Épico', 'Bíblico'],
    description: 'Uma releitura grandiosa da história de Moisés, com efeitos especiais impressionantes retratando as dez pragas e a travessia do Mar Vermelho.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTU1MDM2NjIxOV5BMl5BanBnXkFtZTgwODM3MTc2MjE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=v78-o4LFG4o',
    platforms: ['Disney+', 'Prime Video']
  },
  {
    id: '13', title: 'O Milagre na Cela 7', director: 'Mehmet Ada Öztekin', year: 2019, duration: '2h 12min',
    rating: 8.2, genre: ['Drama', 'Inspiracional'],
    description: 'Um pai com deficiência intelectual é injustamente preso. Seus companheiros de cela o ajudam a reencontrar sua filha pequena em uma história de amor e fé.',
    image: 'https://m.media-amazon.com/images/M/MV5BZGVkNWE4ZjQtODRlYS00MWEyLTliNmUtOWQ0NmIxMjk4NGVhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=KklOP4GY_Og',
    platforms: ['Netflix']
  },
  {
    id: '14', title: 'Filho de Deus', director: 'Christopher Spencer', year: 2014, duration: '2h 18min',
    rating: 5.7, genre: ['Bíblico', 'Drama'],
    description: 'A vida de Jesus Cristo desde o nascimento em Belém até a crucificação e ressurreição, contada com reverência e grandiosidade cinematográfica.',
    image: 'https://m.media-amazon.com/images/M/MV5BMjA5NjI1NjIzMl5BMl5BanBnXkFtZTgwOTI1NjYyMTE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=hBk4i5FvDBM',
    platforms: ['Netflix', 'Prime Video']
  },
  {
    id: '15', title: 'O Jovem Messias', director: 'Cyrus Nowrasteh', year: 2016, duration: '1h 51min',
    rating: 5.6, genre: ['Bíblico', 'Drama'],
    description: 'A história imagina a infância de Jesus aos 7 anos, quando ele começa a descobrir seus poderes divinos enquanto sua família o protege de perigos.',
    image: 'https://m.media-amazon.com/images/M/MV5BMTcyMjU0MTkxNl5BMl5BanBnXkFtZTgwMjE2MDQ1NzE@._V1_.jpg',
    trailer: 'https://www.youtube.com/watch?v=7wCnMnERSgA',
    platforms: ['Prime Video', 'Apple TV']
  },
];

const fallbackStories: Story[] = [
  { id: '1', title: 'A Criação do Mundo', description: 'No princípio, Deus criou os céus e a terra. Em seis dias, formou tudo que existe — a luz, o céu, a terra, os mares, os animais e o ser humano.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', category: 'Antigo Testamento', fullText: 'No princípio, Deus criou os céus e a terra. A terra era sem forma e vazia, e havia trevas sobre a face do abismo. E o Espírito de Deus pairava sobre as águas. Disse Deus: "Haja luz!" E houve luz.' },
  { id: '2', title: 'Adão e Eva', description: 'Deus criou o homem e a mulher e os colocou no Jardim do Éden. A serpente os tentou e eles provaram do fruto proibido.', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800', category: 'Antigo Testamento', fullText: 'E o Senhor Deus formou o homem do pó da terra e soprou em seus narizes o fôlego de vida, e o homem se tornou alma vivente.' },
  { id: '3', title: 'Noé e a Arca', description: 'Deus pediu a Noé que construísse uma grande arca para salvar sua família e os animais de um dilúvio que cobriria toda a terra.', image: 'https://images.unsplash.com/photo-1534236567563-7b31e9930b3c?w=800', category: 'Antigo Testamento', fullText: 'Noé era homem justo e íntegro entre os seus contemporâneos; Noé andava com Deus.' },
  { id: '4', title: 'O Nascimento de Jesus', description: 'O anjo Gabriel visitou Maria e anunciou que ela daria à luz o Salvador. Jesus nasceu em uma manjedoura em Belém.', image: 'https://images.unsplash.com/photo-1545042679-bab03bfad3d2?w=800', category: 'Novo Testamento', fullText: 'Maria deu à luz o seu filho primogênito, envolveu-o em panos e o deitou numa manjedoura, porque não havia lugar para eles na hospedaria.' },
  { id: '5', title: 'A Ressurreição de Cristo', description: 'Três dias após a crucificação, Jesus ressuscitou dos mortos, cumprindo as profecias e trazendo esperança eterna à humanidade.', image: 'https://images.unsplash.com/photo-1544027993-da0a3f73f028?w=800', category: 'Novo Testamento', fullText: 'Ele não está aqui; ressuscitou, como tinha dito. Venham ver o lugar onde ele jazia.' },
  { id: '6', title: 'Davi e Golias', description: 'O jovem pastor Davi enfrentou o gigante filisteu Golias com apenas uma funda e uma pedra, confiando no poder de Deus.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', category: 'Antigo Testamento', fullText: 'Davi disse ao filisteu: "Você vem contra mim com espada, lança e dardo, mas eu vou contra você em nome do Senhor dos Exércitos."' },
];

const fallbackChurches: Church[] = [
  { id: '1', name: 'Basílica de São Pedro', location: 'Vaticano, Roma', description: 'A maior e mais importante igreja do mundo católico, centro espiritual de mais de 1 bilhão de fiéis. Projetada por Michelangelo e Bernini.', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800', yearBuilt: 1626 },
  { id: '2', name: 'Notre-Dame de Paris', location: 'Paris, França', description: 'Uma obra-prima da arquitetura gótica francesa, às margens do rio Sena. Seus vitrais e rosáceas são reconhecidos mundialmente.', image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800', yearBuilt: 1345 },
  { id: '3', name: 'Sagrada Família', location: 'Barcelona, Espanha', description: 'A obra-prima inacabada de Antoni Gaudí, com suas torres únicas e fachadas esculpidas que contam histórias bíblicas.', image: 'https://images.unsplash.com/photo-1583779457711-ab3cae7a9534?w=800', yearBuilt: 1882 },
  { id: '4', name: 'Catedral de São Basílio', location: 'Moscou, Rússia', description: 'Com suas cúpulas coloridas e formato único, esta catedral é um dos marcos mais reconhecíveis do mundo.', image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800', yearBuilt: 1561 },
  { id: '5', name: 'Catedral de Milão', location: 'Milão, Itália', description: 'A maior catedral gótica da Itália, com mais de 3.400 estátuas e 135 pináculos. Sua construção levou quase 600 anos.', image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800', yearBuilt: 1965 },
];

// ===== API CALLS WITH FALLBACK =====
async function apiFetchWithTimeout<T>(url: string, options?: RequestInit, timeoutMs = 3000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const resp = await fetch(url, { ...options, headers: getHeaders(), signal: controller.signal });
    clearTimeout(timer);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch {
    clearTimeout(timer);
    throw new Error('API unavailable');
  }
}

// MOVIES
export async function getMovies(): Promise<Movie[]> {
  try {
    const data = await apiFetchWithTimeout<Movie[]>('/api/movies');
    return data.length > 0 ? data : [...fallbackMovies];
  } catch {
    return [...fallbackMovies];
  }
}
export async function createMovie(m: Omit<Movie, 'id'>): Promise<Movie> {
  try { return await apiFetchWithTimeout<Movie>('/api/movies', { method: 'POST', body: JSON.stringify(m) }); }
  catch { const n = { ...m, id: Date.now().toString() } as Movie; fallbackMovies.push(n); return n; }
}
export async function updateMovie(id: string, m: Partial<Movie>): Promise<void> {
  try { await apiFetchWithTimeout(`/api/movies?id=${id}`, { method: 'PUT', body: JSON.stringify(m) }); }
  catch { const i = fallbackMovies.findIndex(x => x.id === id); if (i >= 0) Object.assign(fallbackMovies[i], m); }
}
export async function deleteMovie(id: string): Promise<void> {
  try { await apiFetchWithTimeout(`/api/movies?id=${id}`, { method: 'DELETE' }); }
  catch { const i = fallbackMovies.findIndex(x => x.id === id); if (i >= 0) fallbackMovies.splice(i, 1); }
}

// STORIES
export async function getStories(): Promise<Story[]> {
  try {
    const data = await apiFetchWithTimeout<Story[]>('/api/stories');
    return data.length > 0 ? data : [...fallbackStories];
  } catch {
    return [...fallbackStories];
  }
}
export async function createStory(s: Omit<Story, 'id'>): Promise<Story> {
  try { return await apiFetchWithTimeout<Story>('/api/stories', { method: 'POST', body: JSON.stringify(s) }); }
  catch { const n = { ...s, id: Date.now().toString() } as Story; fallbackStories.push(n); return n; }
}
export async function updateStory(id: string, s: Partial<Story>): Promise<void> {
  try { await apiFetchWithTimeout(`/api/stories?id=${id}`, { method: 'PUT', body: JSON.stringify(s) }); }
  catch { const i = fallbackStories.findIndex(x => x.id === id); if (i >= 0) Object.assign(fallbackStories[i], s); }
}
export async function deleteStory(id: string): Promise<void> {
  try { await apiFetchWithTimeout(`/api/stories?id=${id}`, { method: 'DELETE' }); }
  catch { const i = fallbackStories.findIndex(x => x.id === id); if (i >= 0) fallbackStories.splice(i, 1); }
}

// CHURCHES
export async function getChurches(): Promise<Church[]> {
  try {
    const data = await apiFetchWithTimeout<Church[]>('/api/churches');
    return data.length > 0 ? data : [...fallbackChurches];
  } catch {
    return [...fallbackChurches];
  }
}
export async function createChurch(c: Omit<Church, 'id'>): Promise<Church> {
  try { return await apiFetchWithTimeout<Church>('/api/churches', { method: 'POST', body: JSON.stringify(c) }); }
  catch { const n = { ...c, id: Date.now().toString() } as Church; fallbackChurches.push(n); return n; }
}
export async function updateChurch(id: string, c: Partial<Church>): Promise<void> {
  try { await apiFetchWithTimeout(`/api/churches?id=${id}`, { method: 'PUT', body: JSON.stringify(c) }); }
  catch { const i = fallbackChurches.findIndex(x => x.id === id); if (i >= 0) Object.assign(fallbackChurches[i], c); }
}
export async function deleteChurch(id: string): Promise<void> {
  try { await apiFetchWithTimeout(`/api/churches?id=${id}`, { method: 'DELETE' }); }
  catch { const i = fallbackChurches.findIndex(x => x.id === id); if (i >= 0) fallbackChurches.splice(i, 1); }
}
