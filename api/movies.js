import { ObjectId } from 'mongodb';

let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  try {
    const { MongoClient } = await import('mongodb');
    const client = new MongoClient(uri);
    await client.connect();
    cachedDb = client.db('faithdb');
    return cachedDb;
  } catch {
    return null;
  }
}

const fallbackMovies = [
  { id: '1', title: 'A Paixão de Cristo', director: 'Mel Gibson', year: 2004, duration: '2h 7min', rating: 9.2, genre: ['Bíblico', 'Drama'], description: 'As últimas 12 horas da vida de Jesus Cristo.', image: 'https://m.media-amazon.com/images/M/MV5BNTAzNzEyMjQwNl5BMl5BanBnXkFtZTcwNTMzMDk4Mg@@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=4Aif1qEB_LM', platforms: ['Prime Video', 'Apple TV'], featured: true },
  { id: '2', title: 'Ben-Hur', director: 'William Wyler', year: 1959, duration: '3h 32min', rating: 8.1, genre: ['Épico', 'Drama'], description: 'Um príncipe judeu é traído por seu amigo romano.', image: 'https://m.media-amazon.com/images/M/MV5BNjgxY2JiMDYtZGM4OC00MTlhLTgyMmQtMjlkYTc4YjYxNjRiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=frE9rXnaHpE', platforms: ['HBO Max', 'Prime Video'] },
  { id: '3', title: 'Os Dez Mandamentos', director: 'Cecil B. DeMille', year: 1956, duration: '3h 40min', rating: 7.9, genre: ['Bíblico', 'Épico'], description: 'A vida épica de Moisés.', image: 'https://m.media-amazon.com/images/M/MV5BNjA1NGUwNjgtYzE2YS00ZTcyLTg1ZTAtMWI5ODE1MmQyYWU3XkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=mXJkSRCfMHk', platforms: ['Paramount+', 'Prime Video'] },
  { id: '4', title: 'O Príncipe do Egito', director: 'Brenda Chapman', year: 1998, duration: '1h 39min', rating: 8.0, genre: ['Animação', 'Bíblico'], description: 'A história de Moisés em animação.', image: 'https://m.media-amazon.com/images/M/MV5BNzc0NjkxMjYtMDkzMC00YTlhLWFjMDYtZmNiYTczOTQ2N2NiXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=bXsLnZWz6Ts', platforms: ['Netflix', 'Prime Video'] },
  { id: '5', title: 'Ressurreição', director: 'Kevin Reynolds', year: 2016, duration: '1h 47min', rating: 6.4, genre: ['Bíblico', 'Drama'], description: 'Um tribuno romano investiga o desaparecimento do corpo de Jesus.', image: 'https://m.media-amazon.com/images/M/MV5BMjEwMTcyODY2M15BMl5BanBnXkFtZTgwNjUxMzc1NzE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=Kl-dSLkCRXo', platforms: ['Netflix', 'Prime Video'] },
  { id: '6', title: 'Deus Não Está Morto', director: 'Harold Cronk', year: 2014, duration: '1h 53min', rating: 6.9, genre: ['Drama', 'Inspiracional'], description: 'Um estudante cristão enfrenta seu professor ateu.', image: 'https://m.media-amazon.com/images/M/MV5BMjIxNjA5ODE4Ml5BMl5BanBnXkFtZTgwMjM4NjI4MTE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=fUKk0Rk5aUk', platforms: ['Netflix', 'Prime Video'] },
  { id: '7', title: 'A Cabana', director: 'Stuart Hazeldine', year: 2017, duration: '2h 12min', rating: 6.7, genre: ['Drama', 'Inspiracional'], description: 'Um homem recebe um convite para se encontrar com Deus.', image: 'https://m.media-amazon.com/images/M/MV5BMjI4MDJiMmYtMDU4My00NmU3LWE3MzAtNzcxMmNhMjk3NDRhXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=PjPCqg8bfRc', platforms: ['Prime Video', 'Apple TV'] },
  { id: '8', title: 'Noé', director: 'Darren Aronofsky', year: 2014, duration: '2h 18min', rating: 5.7, genre: ['Épico', 'Bíblico'], description: 'A história de Noé e o grande dilúvio.', image: 'https://m.media-amazon.com/images/M/MV5BMjE1MTkwMDA1Nl5BMl5BanBnXkFtZTgwNTM5NTY4MDE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=_OSaJE56mFs', platforms: ['Paramount+', 'Prime Video'] },
  { id: '9', title: 'Paulo, Apóstolo de Cristo', director: 'Andrew Hyatt', year: 2018, duration: '1h 48min', rating: 6.3, genre: ['Bíblico', 'Drama'], description: 'Os últimos dias do apóstolo Paulo na prisão romana.', image: 'https://m.media-amazon.com/images/M/MV5BMjE1OTc5OTMtYjk5Yy00OTQ5LWJjMjUtNWE1MGY1NDJhNjhhXkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=OIaB0SHxrIQ', platforms: ['Netflix', 'Prime Video'] },
  { id: '10', title: 'Fátima', director: 'Marco Pontecorvo', year: 2020, duration: '1h 53min', rating: 6.1, genre: ['Drama', 'Inspiracional'], description: 'A história das crianças de Fátima.', image: 'https://m.media-amazon.com/images/M/MV5BOTI3N2IyMTAtOTIyYi00ZDI5LTk3MTktNjk0ZTcwYmRjNWM1XkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=bNS3KE-Nb4k', platforms: ['Prime Video', 'Apple TV'] },
  { id: '11', title: 'Cabrini', director: 'Alejandro Monteverde', year: 2024, duration: '2h 25min', rating: 7.8, genre: ['Drama', 'Inspiracional'], description: 'A história de Francesca Cabrini.', image: 'https://m.media-amazon.com/images/M/MV5BZmNlYjc0YmItMDVhOC00NTRmLTg3NjctMTdlZTVmOGEzMzBiXkEyXkFqcGc@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=nGrSNk2mOQs', platforms: ['Cinema', 'Prime Video'] },
  { id: '12', title: 'Êxodo: Deuses e Reis', director: 'Ridley Scott', year: 2014, duration: '2h 30min', rating: 6.0, genre: ['Épico', 'Bíblico'], description: 'Releitura da história de Moisés.', image: 'https://m.media-amazon.com/images/M/MV5BMTU1MDM2NjIxOV5BMl5BanBnXkFtZTgwODM3MTc2MjE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=v78-o4LFG4o', platforms: ['Disney+', 'Prime Video'] },
  { id: '13', title: 'O Milagre na Cela 7', director: 'Mehmet Ada Öztekin', year: 2019, duration: '2h 12min', rating: 8.2, genre: ['Drama', 'Inspiracional'], description: 'Um pai injustamente preso luta por sua filha.', image: 'https://m.media-amazon.com/images/M/MV5BZGVkNWE4ZjQtODRlYS00MWEyLTliNmUtOWQ0NmIxMjk4NGVhXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=KklOP4GY_Og', platforms: ['Netflix'] },
  { id: '14', title: 'Filho de Deus', director: 'Christopher Spencer', year: 2014, duration: '2h 18min', rating: 5.7, genre: ['Bíblico', 'Drama'], description: 'A vida de Jesus Cristo.', image: 'https://m.media-amazon.com/images/M/MV5BMjA5NjI1NjIzMl5BMl5BanBnXkFtZTgwOTI1NjYyMTE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=hBk4i5FvDBM', platforms: ['Netflix', 'Prime Video'] },
  { id: '15', title: 'O Jovem Messias', director: 'Cyrus Nowrasteh', year: 2016, duration: '1h 51min', rating: 5.6, genre: ['Bíblico', 'Drama'], description: 'A infância de Jesus aos 7 anos.', image: 'https://m.media-amazon.com/images/M/MV5BMTcyMjU0MTkxNl5BMl5BanBnXkFtZTgwMjE2MDQ1NzE@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=7wCnMnERSgA', platforms: ['Prime Video', 'Apple TV'] },
];

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === 'GET') {
    if (!db) return res.status(200).json(fallbackMovies);
    try {
      const movies = await db.collection('movies').find({}).toArray();
      return res.status(200).json(movies.length > 0 ? movies : fallbackMovies);
    } catch {
      return res.status(200).json(fallbackMovies);
    }
  }

  if (!db) return res.status(503).json({ error: 'Database not configured' });

  try {
    if (req.method === 'POST') {
      const result = await db.collection('movies').insertOne(req.body);
      return res.status(201).json({ ...req.body, _id: result.insertedId });
    }
    if (req.method === 'PUT') {
      const { _id, ...data } = req.body;
      await db.collection('movies').updateOne({ _id: new ObjectId(_id) }, { $set: data });
      return res.status(200).json({ _id, ...data });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await db.collection('movies').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
