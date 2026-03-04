// Archivo: api/save.js
export default async function handler(req, res) {
  // Solo permitimos peticiones PUT
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Obtenemos las credenciales de las variables de entorno (seguras)
  const BIN_ID = process.env.BIN_ID;
  const MASTER_KEY = process.env.MASTER_KEY;

  try {
    const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': MASTER_KEY
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error('Error al guardar en JSONBin');
    }

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
