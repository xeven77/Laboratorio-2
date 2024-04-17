document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
        { name: '1', img: 'imagenes/1.png' },
        { name: '2', img: 'imagenes/2.png' },
        { name: '3', img: 'imagenes/3.png' },
        { name: '4', img: 'imagenes/4.png' },
        { name: '5', img: 'imagenes/5.png' },
        { name: '6', img: 'imagenes/6.png' },
        { name: '7', img: 'imagenes/7.png' },
        { name: '8', img: 'imagenes/8.png' },
        { name: '9', img: 'imagenes/9.png' },
        { name: '10', img: 'imagenes/10.png' },
        { name: '1', img: 'imagenes/1.png' },
        { name: '2', img: 'imagenes/2.png' },
        { name: '3', img: 'imagenes/3.png' },
        { name: '4', img: 'imagenes/4.png' },
        { name: '5', img: 'imagenes/5.png' },
        { name: '6', img: 'imagenes/6.png' },
        { name: '7', img: 'imagenes/7.png' },
        { name: '8', img: 'imagenes/8.png' },
        { name: '9', img: 'imagenes/9.png' },
        { name: '10', img: 'imagenes/10.png' }
    ];

    cardArray.sort(() => 0.5 - Math.random());

    const grid = document.querySelector('.grid');
    const resultDisplay = document.getElementById('result');
    const movesDisplay = document.getElementById('moves');
    const timeDisplay = document.getElementById('time');

    let startTime;
    let moves = 0;
    let cardsWon = [];
    let cardsChosen = [];
    let cardsChosenId = null;
    let flipping = false;

    function createBoard() {
        cardArray.forEach((card, index) => {
            const cardElement = document.createElement('img');
            cardElement.setAttribute('src', 'imagenes/img2.png');
            cardElement.setAttribute('data-id', index);
            cardElement.addEventListener('click', flipCard);
            grid.appendChild(cardElement);
        });
    }

    function checkForMatch() {
        const optionOneId = cardsChosenId;
        const optionTwoId = cardsChosen[1];

        if (cardsChosen[0] === cardsChosen[1] && optionOneId !== optionTwoId) {
            alert('¡Encontraste la pareja!');
            cardsWon.push(cardsChosen[0]);
            cardsWon.push(cardsChosen[1]);
            resultDisplay.textContent = cardsWon.length / 2;
        } else {
            alert('Lo siento, intenta de nuevo');
        }

        const cards = document.querySelectorAll('img');
        cards.forEach(card => {
            const cardId = parseInt(card.getAttribute('data-id'));
            if (!cardsWon.includes(cardId)) {
                card.setAttribute('src', 'imagenes/img2.png');
            }
        });

        cardsChosen = [];
        cardsChosenId = null;
        moves++;
        movesDisplay.textContent = moves;

        if (cardsWon.length === cardArray.length) {
            const endTime = new Date().getTime();
            const totalTime = (endTime - startTime) / 1000;
            timeDisplay.textContent = `Tiempo: ${totalTime.toFixed(2)} segundos`;
            alert('¡Felicidades! ¡Encontraste todas!');
        }

        flipping = false;
    }

    function flipCard() {
        if (flipping) return;

        if (cardsChosen.length === 2) {
            flipping = true;
            setTimeout(checkForMatch, 500);
            return;
        }

        const cardId = parseInt(this.getAttribute('data-id'));

        if (cardsChosenId === cardId || cardsWon.includes(cardId)) return;

        cardsChosen.push(cardArray[cardId].name);

        if (cardsChosenId !== null) {
            const cards = document.querySelectorAll('img');
            cards[cardId].setAttribute('src', cardArray[cardId].img);
            flipping = true;
            cardsChosenId = cardId;
            setTimeout(checkForMatch, 500);
        } else {
            this.setAttribute('src', cardArray[cardId].img);
            cardsChosenId = cardId;
        }

        if (moves === 0) {
            startTime = new Date().getTime();
            setInterval(() => {
                const currentTime = new Date().getTime();
                const elapsedTime = (currentTime - startTime) / 1000;
                timeDisplay.textContent = `Tiempo: ${elapsedTime.toFixed(2)} segundos`;
            }, 100);
        }
    }

    createBoard();
});
