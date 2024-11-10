// public/js/main.js
document.addEventListener('DOMContentLoaded', function() {
    // Effet glitch sur le titre
    const title = document.querySelector('.title');
    if (title) {
        title.setAttribute('data-text', title.textContent);
        setInterval(() => {
            title.style.textShadow = Math.random() > 0.95 ? 'none' : '';
        }, 50);
    }

    // Konami code easter egg
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateHackerMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Vérification des flags
    window.verifyFlag = function() {
        const flagInput = document.getElementById('flagInput');
        const flag = flagInput.value.trim();

        fetch('/api/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ flag })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showSuccess(data.message, data.level);
                    flagInput.value = '';
                    if (data.level === 2) {
                        activateHackerMode();
                    }
                } else {
                    showError(data.message);
                }
            })
            .catch(error => {
                showError("Erreur réseau! T'es pas co ou quoi? 💀");
            });
    };

    // Effets visuels
    function activateHackerMode() {
        document.body.classList.add('hacker-mode');
        createMatrixEffect();

        setTimeout(() => {
            document.body.classList.remove('hacker-mode');
            const matrix = document.querySelector('.matrix-effect');
            if (matrix) matrix.remove();
        }, 5000);
    }

    function createMatrixEffect() {
        const matrix = document.createElement('div');
        matrix.className = 'matrix-effect';
        document.body.appendChild(matrix);

        for (let i = 0; i < 100; i++) {
            createMatrixColumn(matrix);
        }
    }

    function createMatrixColumn(container) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = Math.random() * 100 + '%';
        column.style.animationDuration = Math.random() * 2 + 1 + 's';
        container.appendChild(column);

        setInterval(() => {
            column.textContent = Math.random() > 0.5 ? '1' : '0';
        }, 100);
    }

    function showSuccess(message, level) {
        const container = document.createElement('div');
        container.className = 'success-message';

        // Animation manga
        container.innerHTML = `
            <div class="success-inner">
                <h2 class="victory-text">${level === 1 ? 'SUGOI!' : 'OMAE WA MOU SHINDEIRU!'}</h2>
                <p>${message}</p>
                <div class="manga-effects"></div>
            </div>
        `;

        document.body.appendChild(container);
        createMangaEffects(container.querySelector('.manga-effects'));

        setTimeout(() => {
            container.classList.add('fade-out');
            setTimeout(() => container.remove(), 500);
        }, 3000);
    }

    function createMangaEffects(container) {
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'manga-star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(star);
        }
    }

    function showError(message) {
        const notification = document.createElement('div');
        notification.className = 'notification error';
        notification.textContent = message;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }

    // Easter egg console
    console.log("%cTu check la console? T'es un vrai.", "color: #0f0; font-size: 20px; font-weight: bold;");
    console.log("%cMais le flag est pas ici frérot 😭", "color: #f0f; font-size: 16px;");
});