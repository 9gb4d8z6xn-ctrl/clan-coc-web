# Clan CoC Web · #2CR9U8VCO

Web del clan con datos en tiempo real de la API de Clash of Clans.

## Estructura
```
clan-backend/
├── server.js          ← Backend Node.js (proxy API)
├── package.json
└── public/
    └── index.html     ← Frontend web
```

## Cómo subir a Render (GRATIS)

### 1. Sube el código a GitHub
- Crea una cuenta en github.com
- Crea un repositorio nuevo (ej: "clan-coc-web")
- Sube la carpeta clan-backend entera

### 2. Despliega en Render
- Ve a render.com y crea cuenta gratuita
- New → Web Service
- Conecta tu repositorio de GitHub
- Configura:
  - **Build Command:** `npm install`
  - **Start Command:** `npm start`
  - **Plan:** Free

### 3. Obtén tu URL
- Render te da una URL tipo: `https://clan-coc-web.onrender.com`
- ¡Compártela con todos los del clan!

### 4. ⚠️ Actualiza la API Key
Cuando el backend esté en Render, necesitas actualizar la key de CoC
con la IP del servidor de Render:
- Ve a developer.clashofclans.com
- Edita tu key y añade la IP de Render (la verás en los logs)
- O crea una nueva key con esa IP
