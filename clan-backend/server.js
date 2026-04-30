const express = require(‘express’);
const cors = require(‘cors’);
const fetch = require(‘node-fetch’);

const app = express();
const PORT = process.env.PORT || 3000;

const TOKEN = process.env.COC_TOKEN || ‘’;
const CLAN_TAG = ‘%232CR9U8VCO’;
const COC_BASE = ‘https://api.clashofclans.com/v1’;

app.use(cors());
app.use(express.static(‘public’));

async function cocFetch(path) {
const res = await fetch(COC_BASE + path, {
headers: { ‘Authorization’: ’Bearer ’ + TOKEN }
});
if (!res.ok) throw new Error(’CoC API error: ’ + res.status);
return res.json();
}

app.get(’/api/clan’, async (req, res) => {
try { res.json(await cocFetch(’/clans/’ + CLAN_TAG)); }
catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/war’, async (req, res) => {
try { res.json(await cocFetch(’/clans/’ + CLAN_TAG + ‘/currentwar’)); }
catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/capital’, async (req, res) => {
try { res.json(await cocFetch(’/clans/’ + CLAN_TAG + ‘/capitalraidseasons?limit=1’)); }
catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/warlog’, async (req, res) => {
try { res.json(await cocFetch(’/clans/’ + CLAN_TAG + ‘/warlog?limit=10’)); }
catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/player/:tag’, async (req, res) => {
try {
const tag = ‘%23’ + req.params.tag.replace(’#’,’’).replace(’%23’,’’);
res.json(await cocFetch(’/players/’ + tag));
} catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/cwl’, async (req, res) => {
try { res.json(await cocFetch(’/clans/’ + CLAN_TAG + ‘/currentwar/leaguegroup’)); }
catch (e) { res.status(500).json({ error: e.message }); }
});

app.get(’/api/cwlwar/:tag’, async (req, res) => {
try {
const tag = encodeURIComponent(req.params.tag);
res.json(await cocFetch(’/clanwarleagues/wars/’ + tag));
} catch (e) { res.status(500).json({ error: e.message }); }
});

const server = app.listen(PORT, function() {
console.log(’Servidor clan activo en puerto ’ + PORT);
});

server.on(‘error’, function(err) {
if (err.code === ‘EADDRINUSE’) {
console.log(‘Puerto ’ + PORT + ’ ocupado, reintentando…’);
setTimeout(function() { server.close(); server.listen(PORT); }, 3000);
}
});
