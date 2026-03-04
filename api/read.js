// Archivo: api/read.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BIN_ID = process.env.BIN_ID;
  const MASTER_KEY = process.env.MASTER_KEY;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
      headers: {
        'X-Master-Key': MASTER_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Error fetching from JSONBin');
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
