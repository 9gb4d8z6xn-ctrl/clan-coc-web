const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.COC_TOKEN || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjBhZWQxMDAyLTY4MmQtNDViMC1hYzY3LWZlZTA5NzBlNGRmMCIsImlhdCI6MTc3NzM1OTY0OCwic3ViIjoiZGV2ZWxvcGVyLzQ3ZDkxNWZlLWI4MzMtZGRjOC01MWVhLTZiNDg4ODA5ZDIzMCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjkwLjE3My4xNDQuMiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.4iWP9Yru6LzKtsurrzZKCDJQ05iCQPA_2GoAUAJRaY8yz3yedfMXsyEzwtdzNMUQfZ9YTovOjDI_cyJnMejstw';
const CLAN_TAG = '%232CR9U8VCO';
const COC_BASE = 'https://api.clashofclans.com/v1';

app.use(cors());
app.use(express.static('public'));

async function cocFetch(path) {
  const res = await fetch(`${COC_BASE}${path}`, {
    headers: { 'Authorization': `Bearer ${TOKEN}` }
  });
  if (!res.ok) throw new Error(`CoC API error: ${res.status}`);
  return res.json();
}

// Clan info
app.get('/api/clan', async (req, res) => {
  try {
    const data = await cocFetch(`/clans/${CLAN_TAG}`);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Current war
app.get('/api/war', async (req, res) => {
  try {
    const data = await cocFetch(`/clans/${CLAN_TAG}/currentwar`);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Capital raid seasons
app.get('/api/capital', async (req, res) => {
  try {
    const data = await cocFetch(`/clans/${CLAN_TAG}/capitalraidseasons?limit=1`);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
// Obtener IP pública del servidor
const https = require('https');
https.get('https://api.ipify.org?format=json', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const ip = JSON.parse(data).ip;
    console.log('🌐 IP PUBLICA DE RENDER:', ip);
  });
}).on('error', (e) => console.log('Error obteniendo IP:', e.message));
const server = app.listen(PORT, () => console.log(`Servidor clan activo en puerto ${PORT}`));

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Puerto ${PORT} ocupado, reintentando...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 3000);
  }
});
