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

const fallbackStories = [
  { id: '1', title: 'A Criação do Mundo', description: 'No princípio, Deus criou os céus e a terra.', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800', category: 'Antigo Testamento', fullText: 'No princípio, Deus criou os céus e a terra. A terra era sem forma e vazia.' },
  { id: '2', title: 'Adão e Eva', description: 'Deus criou o homem e a mulher no Jardim do Éden.', image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800', category: 'Antigo Testamento', fullText: 'E o Senhor Deus formou o homem do pó da terra e soprou em seus narizes o fôlego de vida.' },
  { id: '3', title: 'Noé e a Arca', description: 'Deus pediu a Noé que construísse uma arca.', image: 'https://images.unsplash.com/photo-1534236567563-7b31e9930b3c?w=800', category: 'Antigo Testamento', fullText: 'Noé era homem justo e íntegro entre os seus contemporâneos.' },
  { id: '4', title: 'O Nascimento de Jesus', description: 'O anjo Gabriel anunciou a Maria o nascimento do Salvador.', image: 'https://images.unsplash.com/photo-1545042679-bab03bfad3d2?w=800', category: 'Novo Testamento', fullText: 'Maria deu à luz o seu filho primogênito e o deitou numa manjedoura.' },
  { id: '5', title: 'A Ressurreição de Cristo', description: 'Jesus ressuscitou dos mortos ao terceiro dia.', image: 'https://images.unsplash.com/photo-1544027993-da0a3f73f028?w=800', category: 'Novo Testamento', fullText: 'Ele não está aqui; ressuscitou, como tinha dito.' },
  { id: '6', title: 'Davi e Golias', description: 'O jovem pastor Davi enfrentou o gigante Golias.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', category: 'Antigo Testamento', fullText: 'Davi disse: Eu vou contra você em nome do Senhor dos Exércitos.' },
];

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === 'GET') {
    if (!db) return res.status(200).json(fallbackStories);
    try {
      const stories = await db.collection('stories').find({}).toArray();
      return res.status(200).json(stories.length > 0 ? stories : fallbackStories);
    } catch {
      return res.status(200).json(fallbackStories);
    }
  }

  if (!db) return res.status(503).json({ error: 'Database not configured' });

  try {
    if (req.method === 'POST') {
      const result = await db.collection('stories').insertOne(req.body);
      return res.status(201).json({ ...req.body, _id: result.insertedId });
    }
    if (req.method === 'PUT') {
      const { _id, ...data } = req.body;
      await db.collection('stories').updateOne({ _id: new ObjectId(_id) }, { $set: data });
      return res.status(200).json({ _id, ...data });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await db.collection('stories').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
