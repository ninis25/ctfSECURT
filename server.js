// server.js
const express = require('express');
const path = require('path');
const { createAllChallenges, flag1, flag2 } = require('./challenges/create_challenges');
const app = express();
const port = 3001;

// Blagues et memes modernes
const memes = [
    "POV: Tu cherches le flag depuis 2h 💀",
    "Le flag: 'Cheh, tu me trouveras pas'",
    "Skill issue? Va toucher de l'herbe frr",
    "Quand t'as pas encore trouvé le flag: 'Comment on fait les srx?'",
    "Le flag est parti à Miami avec Mehdi",
    "*Musique triste de Squeezie en fond*",
    "Ratio + L + pas de flag + cope",
    "Flag reveal à 100k likes les srx",
    "POV: Tu connais même pas strings en 2024 😭",
    "Le flag plus rare que les views de Norman"
];

// Création des challenges au démarrage
try {
    createAllChallenges();
    console.log('Challenges créés avec succès!');
} catch (error) {
    console.error('Erreur lors de la création des challenges:', error);
}

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/challenges', express.static('challenges/files'));

// Route principale
app.get('/', (req, res) => {
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];

    res.send(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>CTF Forensic 2024</title>
            <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="matrix-bg"></div>
            
            <div class="container">
                <h1 class="title glitch" data-text="CTF Forensic 2024">CTF Forensic 2024</h1>
                
                <div class="meme-box">
                    <p>${randomMeme}</p>
                </div>

                <div class="challenge-card">
                    <h2>Niveau 1: Le Meme NPC</h2>
                    <div class="challenge-content">
                        <img src="/assets/npc.svg" alt="NPC Meme" class="preview-gif">
                        <div class="challenge-text">
                            <p>POV: Tu trouves une image suspecte sur Twitter...</p>
                            <div class="hints">
                                <p>Indices:</p>
                                <ul>
                                    <li>Les vrais savent vérifier après IEND</li>
                                    <li>hexdump ou xxd = meta</li>
                                    <li>Chad move: utilise strings</li>
                                </ul>
                            </div>
                            <a href="/challenges/level1/npc_meme.png" class="download-btn">
                                <span class="btn-text">DL le fichier</span>
                                <span class="btn-subtext">(t'es pas un NPC)</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="challenge-card">
                    <h2>Niveau 2: TikTok Leaks</h2>
                    <div class="challenge-content">
                        <img src="/assets/tiktok.svg" alt="TikTok Hack" class="preview-gif">
                        <div class="challenge-text">
                            <p>Une vidéo TikTok qui cache des dingueries dans ses métadonnées...</p>
                            <div class="hints">
                                <p>Indices:</p>
                                <ul>
                                    <li>Les métadonnées c'est la sauce</li>
                                    <li>Base64? Tu connais...</li>
                                    <li>Y'a peut-être un .zip qui traîne</li>
                                </ul>
                            </div>
                            <div class="download-group">
                                <a href="/challenges/level2/tiktok_video.mp4" class="download-btn">
                                    <span class="btn-text">DL le fichier</span>
                                    <span class="btn-subtext">(pas fake)</span>
                                </a>
                                <a href="/challenges/level2/ratio.zip" class="download-btn secret">
                                    <span class="btn-text">???</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            
        <h3>Vérifier un flag</h3>
        <div class="input-group">
            <input type="text" id="flagInput" placeholder="FLAG{...}" class="flag-input">
            <button onclick="verifyFlag()" class="verify-btn">Vérifier</button>
        </div>
            </div>

            <script src="/js/main.js"></script>
            <!-- Easter egg en commentaire -->
            <!-- Les vrais check les commentaires HTML en 2024 -->
            <!-- POV: Tu cherches le flag ici mais il est dans les fichiers --> 
        </body>
        </html>
    `);
});

// API pour vérifier les flags
app.post('/api/verify', (req, res) => {
    const { flag } = req.body;

    if (!flag) {
        return res.json({
            success: false,
            message: "Ratio + L + pas de flag"
        });
    }

    if (flag === flag1) {
        return res.json({
            success: true,
            message: "GG! T'es pas un NPC! Niveau 1 validé!",
            level: 1
        });
    }

    if (flag === flag2) {
        return res.json({
            success: true,
            message: "GIGACHAD! Niveau 2 validé! T'es un vrai!",
            level: 2
        });
    }

    return res.json({
        success: false,
        message: "Mauvais flag frr! Va toucher de l'herbe!"
    });
});

// Easter egg route
app.get('/konami', (req, res) => {
    res.json({
        message: "POV: Tu connais le Konami code en 2024 💀",
        hint: "Check les fichiers avec 'strings' frérot"
    });
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`🔥 CTF running on http://localhost:${port}`);
    console.log('Les vrais check les fichiers avec strings');
});