// challenges/create_challenges.js
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// Flags
const flag1 = "FLAG{NPC_M3M3_L0RD_2024}";
const flag2 = "FLAG{T1KT0K_H4CK3R_2024}";

// Fonction pour créer le challenge niveau 1 (PNG modifié)
function createNPCMeme() {
    // En-tête PNG
    const pngHeader = Buffer.from("89504E470D0A1A0A", 'hex');

    // IHDR chunk minimal
    const ihdrChunk = Buffer.concat([
        Buffer.from("0000000D49484452", 'hex'),  // Longueur et type
        Buffer.from("0000006400000064", 'hex'),  // Largeur/hauteur = 100x100
        Buffer.from("08020000000200A55E", 'hex') // Autres données IHDR
    ]);

    // Message caché en texte clair
    const hiddenText = Buffer.from(`
    POV: Tu cherches le flag
    Imagine ne pas utiliser strings en 2024
    Challenge by @HackerFr
    Real ones check after IEND
    `);

    // IEND chunk standard
    const iendChunk = Buffer.from("0000000049454E44AE426082", 'hex');

    // Flag caché après IEND
    const hiddenFlag = Buffer.from(flag1);

    // Assembler le fichier
    const finalFile = Buffer.concat([
        pngHeader,
        ihdrChunk,
        hiddenText,
        iendChunk,
        hiddenFlag
    ]);

    // Créer le dossier si nécessaire
    const dir = path.join(__dirname, 'files/level1');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // Sauvegarder le fichier
    fs.writeFileSync(path.join(dir, 'npc_meme.png'), finalFile);
    console.log('Challenge 1 créé : npc_meme.png');
}

// Fonction pour créer le challenge niveau 2 (MP4 avec métadonnées)
function createTikTokVideo() {
    // En-tête MP4 minimal
    const mp4Header = Buffer.from("000000206674797069736F6D", 'hex');

    // Métadonnées avec flag caché
    const metadata = {
        title: "POV_quand_tu_hack.mp4",
        creator: "@HackerFr",
        description: "Les vrais savent chercher dans les métadonnées frr",
        likes: 133742069,
        comments: [
            "Real hacker check metadata frr",
            "Ratio + L + pas de flag",
            "strings command > all"
        ],
        hidden_data: Buffer.from(flag2).toString('base64')
    };

    // Convertir les métadonnées en buffer
    const metadataBuffer = Buffer.from(JSON.stringify(metadata));

    // Créer un faux contenu vidéo
    const fakeVideoData = crypto.randomBytes(1000);

    // Assembler le fichier
    const finalFile = Buffer.concat([
        mp4Header,
        fakeVideoData,
        metadataBuffer
    ]);

    // Créer le dossier si nécessaire
    const dir = path.join(__dirname, 'files/level2');
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }

    // Sauvegarder le fichier
    fs.writeFileSync(path.join(dir, 'tiktok_video.mp4'), finalFile);
    console.log('Challenge 2 créé : tiktok_video.mp4');

    // Créer le ZIP bonus
    createRatioZip(dir);
}

// Fonction pour créer le ZIP bonus du niveau 2
function createRatioZip(dir) {
    // En-tête ZIP minimal
    const zipHeader = Buffer.from("504B0304140000000000", 'hex');

    // Commentaire avec indice
    const comment = Buffer.from(`
    POV: Tu cherches dans un ZIP en 2024
    Imagine ne pas voir le base64 juste en dessous
    `);

    // Flag encodé
    const encodedFlag = Buffer.from(flag2).toString('base64');

    // Assembler le fichier
    const finalFile = Buffer.concat([
        zipHeader,
        comment,
        Buffer.from(encodedFlag)
    ]);

    // Sauvegarder le fichier
    fs.writeFileSync(path.join(dir, 'ratio.zip'), finalFile);
    console.log('Bonus créé : ratio.zip');
}

// Créer tous les challenges
function createAllChallenges() {
    console.log('Création des challenges...');
    createNPCMeme();
    createTikTokVideo();
    console.log('Tous les challenges ont été créés !');
}

// Exécuter si appelé directement
if (require.main === module) {
    createAllChallenges();
}

module.exports = {
    createAllChallenges,
    flag1,
    flag2
};