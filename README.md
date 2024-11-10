# CTF Forensic 2024 - Manga Edition 🎯

Un CTF forensic avec des références à la culture web/memes de 2024 ! Trouve les flags cachés dans les fichiers pour devenir un vrai hacker.

## 🎮 Installation

1. Clone le projet et installe les dépendances :
```bash
# Créer le projet
mkdir ctf-forensic-2024
cd ctf-forensic-2024

# Initialiser le projet
npm init -y

# Installer les dépendances
npm install express crypto
```

2. Crée la structure des dossiers :
```bash
mkdir -p public/{css,js} challenges/files/{level1,level2}
```

3. Copie les fichiers au bon endroit :
```
ctf-forensic-2024/
├── challenges/
│   ├── create_challenges.js
│   ├── solve_challenges.js
│   └── files/
│       ├── level1/
│       └── level2/
├── public/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
├── server.js
└── package.json
```

## 🚀 Lancement

```bash
# Lance le serveur
node server.js

# Le serveur démarre sur http://localhost:3001
```

## 🎯 Les Challenges

### Niveau 1 : Le Meme NPC
- Un fichier PNG qui cache des secrets
- Utilise des outils comme `strings`, `hexdump` ou `xxd`
- Le flag est caché après le marqueur IEND

### Niveau 2 : TikTok Leaks
- Un faux fichier MP4 avec des métadonnées cachées
- Un fichier ZIP bonus
- Des données encodées en base64
- Les vrais savent utiliser `strings`

## 🛠 Outils Nécessaires

- `strings` : Pour voir le texte lisible dans les fichiers
- `xxd` ou `hexdump` : Pour l'analyse hexadécimale
- `base64` : Pour décoder les données

## 💡 Indices

### Niveau 1
```bash
# Trouve le flag
strings npc_meme.png | grep FLAG
```

### Niveau 2
```bash
# Cherche dans les métadonnées
strings tiktok_video.mp4 | grep hidden_data

# Décode le base64
echo "LE_BASE64_TROUVE" | base64 -d
```

## 🏆 Flags

Les flags sont au format :
- Niveau 1 : `FLAG{...}`
- Niveau 2 : `FLAG{...}`

## 🎨 Style et Animations

Le CTF inclut :
- Animations manga/cyberpunk
- Effets glitch
- Easter eggs (essaie le Konami code ↑↑↓↓←→←→BA)
- Messages de succès stylés
- Fond Matrix animé

## 🤖 Easter Eggs

- Konami code : Entre ↑↑↓↓←→←→BA sur n'importe quelle page
- Messages cachés dans la console du navigateur
- Commentaires HTML cachés
- Fichier ZIP bonus dans le niveau 2

## ⚠️ Notes

- Les fichiers de challenge sont générés automatiquement au lancement du serveur
- Les flags changent à chaque génération
- Style inspiré des mangas et de la culture web 2024

## 👾 Credits

- Memes et références : TikTok/Twitter 2024
- Design : Style Manga/Cyberpunk
- Inspiré par : La culture web actuelle

## 🤝 Contribution

1. Fork le projet
2. Crée ta branche (`git checkout -b feature/AmazingFeature`)
3. Commit tes changements (`git commit -m 'Add some AmazingFeature'`)
4. Push sur la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une Pull Request

## 📝 License

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---
*POV: Tu lis ce README en 2024* 💀