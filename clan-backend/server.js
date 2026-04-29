const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.COC_TOKEN;
const CLAN_TAG = '%232CR9U8VCO';
const COC_BASE = 'https://api.clashofclans.com/v1';

app.use(cors());
app.use(express.static('public'));

// CACHE
let cache = null;
let lastFetch = 0;
const CACHE_TIME = 60000; // 60s

async function cocFetch(path) {
  const res = await fetch(`${COC_BASE}${path}`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} - ${text}`);
  }

  return res.json();
}

// ENDPOINT ÚNICO
app.get('/api/all', async (req, res) => {
  const now = Date.now();

  if (cache && now - lastFetch < CACHE_TIME) {
    return res.json(cache);
  }

  try {
    const [clan, war, capital, warlog] = await Promise.all([
      cocFetch(`/clans/${CLAN_TAG}`),
      cocFetch(`/clans/${CLAN_TAG}/currentwar`),
      cocFetch(`/clans/${CLAN_TAG}/capitalraidseasons?limit=1`),
      cocFetch(`/clans/${CLAN_TAG}/warlog?limit=10`)
    ]);

    cache = { clan, war, capital, warlog };
    lastFetch = now;

    res.json(cache);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor activo en puerto ${PORT}`);
});
