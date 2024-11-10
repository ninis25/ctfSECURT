// challenges/solve_challenges.js
const fs = require('fs');
const path = require('path');

// Couleurs pour le terminal
const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m'
};

// Fonction pour le niveau 1 (PNG)
async function solveLevel1() {
    console.log('\n' + colors.cyan + '🔍 Résolution du Niveau 1 (NPC Meme)...' + colors.reset);

    try {
        // Chemin du fichier
        const filePath = path.join(__dirname, 'files/level1/npc_meme.png');

        // Vérifier si le fichier existe
        if (!fs.existsSync(filePath)) {
            throw new Error('Fichier npc_meme.png non trouvé! Lance d\'abord le serveur pour créer les challenges.');
        }

        // Lire le fichier
        const pngData = fs.readFileSync(filePath);
        console.log(colors.blue + '📂 Fichier PNG trouvé et lu' + colors.reset);

        // Chercher le marqueur IEND
        const iendIndex = pngData.indexOf(Buffer.from('IEND'));
        if (iendIndex === -1) {
            throw new Error('Marqueur IEND non trouvé dans le PNG');
        }

        console.log(colors.blue + '🔍 Marqueur IEND trouvé à la position: ' + iendIndex + colors.reset);

        // Extraire les données après IEND
        const dataAfterIend = pngData.slice(iendIndex + 8); // +8 pour sauter le chunk IEND

        // Convertir en string et chercher le flag
        const stringData = dataAfterIend.toString('utf-8');
        const flagMatch = stringData.match(/FLAG{[^}]+}/);

        if (flagMatch) {
            console.log(colors.green + '🚩 Flag du niveau 1 trouvé:' + colors.reset);
            console.log(colors.yellow + flagMatch[0] + colors.reset);
        } else {
            throw new Error('Pas de flag trouvé après IEND');
        }

    } catch (error) {
        console.error(colors.red + '❌ Erreur niveau 1:', error.message + colors.reset);
    }
}

// Fonction pour le niveau 2 (MP4 et ZIP)
async function solveLevel2() {
    console.log('\n' + colors.cyan + '🔍 Résolution du Niveau 2 (TikTok)...' + colors.reset);

    try {
        // Chemin des fichiers
        const mp4Path = path.join(__dirname, 'files/level2/tiktok_video.mp4');
        const zipPath = path.join(__dirname, 'files/level2/ratio.zip');

        // Vérifier l'existence des fichiers
        if (!fs.existsSync(mp4Path)) {
            throw new Error('Fichier tiktok_video.mp4 non trouvé!');
        }

        // Lire le fichier MP4
        console.log(colors.blue + '📂 Analyse du fichier MP4...' + colors.reset);
        const mp4Data = fs.readFileSync(mp4Path);
        const mp4String = mp4Data.toString('utf-8');

        // Chercher les métadonnées JSON
        try {
            const jsonMatch = mp4String.match(/{[\s\S]*?hidden_data[^}]+}/);
            if (jsonMatch) {
                const metadata = JSON.parse(jsonMatch[0]);
                if (metadata.hidden_data) {
                    const decodedFlag = Buffer.from(metadata.hidden_data, 'base64').toString('utf-8');
                    console.log(colors.green + '🚩 Flag trouvé dans le MP4:' + colors.reset);
                    console.log(colors.yellow + decodedFlag + colors.reset);
                }
            }
        } catch (error) {
            console.log(colors.red + '⚠️ Erreur lors du parsing JSON des métadonnées' + colors.reset);
        }

        // Vérifier le ZIP bonus
        if (fs.existsSync(zipPath)) {
            console.log(colors.blue + '\n📂 Analyse du fichier ZIP bonus...' + colors.reset);
            const zipData = fs.readFileSync(zipPath);
            const zipString = zipData.toString('utf-8');

            // Chercher une chaîne base64 qui pourrait être un flag
            const base64Regex = /[A-Za-z0-9+/=]{20,}/;
            const base64Matches = zipString.match(base64Regex);

            if (base64Matches) {
                try {
                    const decodedData = Buffer.from(base64Matches[0], 'base64').toString('utf-8');
                    if (decodedData.includes('FLAG{')) {
                        console.log(colors.green + '🚩 Flag bonus trouvé dans le ZIP:' + colors.reset);
                        console.log(colors.yellow + decodedData + colors.reset);
                    }
                } catch (error) {
                    console.log(colors.red + '⚠️ Données base64 invalides dans le ZIP' + colors.reset);
                }
            }
        }

    } catch (error) {
        console.error(colors.red + '❌ Erreur niveau 2:', error.message + colors.reset);
    }
}

// Fonction principale pour résoudre tous les challenges
async function solveAllChallenges() {
    console.log(colors.cyan + '🎯 Début de la résolution automatique des challenges...' + colors.reset);

    await solveLevel1();
    await solveLevel2();

    console.log(colors.green + '\n✨ Résolution terminée!' + colors.reset);
}

// Exécuter si appelé directement
if (require.main === module) {
    solveAllChallenges().catch(error => {
        console.error(colors.red + '❌ Erreur fatale:', error + colors.reset);
    });
}

module.exports = {
    solveLevel1,
    solveLevel2,
    solveAllChallenges
};