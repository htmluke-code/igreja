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

const fallbackChurches = [
  { id: '1', name: 'Basílica de São Pedro', location: 'Vaticano, Roma', description: 'A maior e mais importante igreja do mundo católico.', image: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800', yearBuilt: 1626 },
  { id: '2', name: 'Notre-Dame de Paris', location: 'Paris, França', description: 'Obra-prima da arquitetura gótica francesa.', image: 'https://images.unsplash.com/photo-1478391679764-b2d8b3cd1e94?w=800', yearBuilt: 1345 },
  { id: '3', name: 'Sagrada Família', location: 'Barcelona, Espanha', description: 'A obra-prima inacabada de Antoni Gaudí.', image: 'https://images.unsplash.com/photo-1583779457711-ab3cae7a9534?w=800', yearBuilt: 1882 },
  { id: '4', name: 'Catedral de São Basílio', location: 'Moscou, Rússia', description: 'Com suas cúpulas coloridas e formato único.', image: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800', yearBuilt: 1561 },
  { id: '5', name: 'Catedral de Milão', location: 'Milão, Itália', description: 'A maior catedral gótica da Itália.', image: 'https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?w=800', yearBuilt: 1965 },
];

export default async function handler(req, res) {
  const db = await getDb();

  if (req.method === 'GET') {
    if (!db) return res.status(200).json(fallbackChurches);
    try {
      const churches = await db.collection('churches').find({}).toArray();
      return res.status(200).json(churches.length > 0 ? churches : fallbackChurches);
    } catch {
      return res.status(200).json(fallbackChurches);
    }
  }

  if (!db) return res.status(503).json({ error: 'Database not configured' });

  try {
    if (req.method === 'POST') {
      const result = await db.collection('churches').insertOne(req.body);
      return res.status(201).json({ ...req.body, _id: result.insertedId });
    }
    if (req.method === 'PUT') {
      const { _id, ...data } = req.body;
      await db.collection('churches').updateOne({ _id: new ObjectId(_id) }, { $set: data });
      return res.status(200).json({ _id, ...data });
    }
    if (req.method === 'DELETE') {
      const { id } = req.body;
      await db.collection('churches').deleteOne({ _id: new ObjectId(id) });
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
