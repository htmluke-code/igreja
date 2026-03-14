let cachedDb = null;

async function getDb() {
  if (cachedDb) return cachedDb;
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;
  const { MongoClient } = await import('mongodb');
  const client = new MongoClient(uri);
  await client.connect();
  cachedDb = client.db('faithdb');
  return cachedDb;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Use POST' });
  }

  const db = await getDb();
  if (!db) return res.status(503).json({ error: 'MONGODB_URI not configured' });

  try {
    await db.collection('movies').deleteMany({});
    await db.collection('stories').deleteMany({});
    await db.collection('churches').deleteMany({});

    await db.collection('movies').insertMany([
      { title: 'A Paixão de Cristo', director: 'Mel Gibson', year: 2004, duration: '2h 7min', rating: 9.2, genre: ['Bíblico', 'Drama'], description: 'As últimas 12 horas da vida de Jesus Cristo.', image: 'https://m.media-amazon.com/images/M/MV5BNTAzNzEyMjQwNl5BMl5BanBnXkFtZTcwNTMzMDk4Mg@@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=4Aif1qEB_LM', platforms: ['Prime Video', 'Apple TV'], featured: true },
      { title: 'Ben-Hur', director: 'William Wyler', year: 1959, duration: '3h 32min', rating: 8.1, genre: ['Épico', 'Drama'], description: 'Um príncipe judeu é traído por seu amigo romano.', image: 'https://m.media-amazon.com/images/M/MV5BNjgxY2JiMDYtZGM4OC00MTlhLTgyMmQtMjlkYTc4YjYxNjRiXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_.jpg', trailer: 'https://www.youtube.com/watch?v=frE9rXnaHpE', platforms: ['HBO Max', 'Prime Video'] },
    ]);

    await db.collection('stories').insertMany([
      { title: 'A Criação do Mundo', description: 'No princípio, Deus criou os céus e a terra.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', category: 'Antigo Testamento', fullText: 'No princípio, Deus criou os céus e a terra.' },
    ]);

    await db.collection('churches').insertMany([
      { name: 'Basílica de São Pedro', location: 'Vaticano, Roma', description: 'A maior e mais importante igreja.', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800', yearBuilt: 1626 },
    ]);

    return res.status(200).json({ success: true, message: 'Database seeded' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
