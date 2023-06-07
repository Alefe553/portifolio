const newElement = (tagName, className) => {
    const elem = document.createElement(tagName);
    elem.className = className;
    return elem;
}

class Barrier {
    constructor(reverse = false) {
        this.element = newElement('div', 'barrier');

        const border = newElement('div', 'border');
        this.body = newElement('div', 'body');
        this.element.appendChild(reverse ? this.body : border);
        this.element.appendChild(reverse ? border : this.body);
    }

    setHeight(height) {
        this.body.style.height = height + 'px';
    }
}

class BarrierPair {
    constructor(height, opening, x) {
        this.height = height;
        this.opening = opening;
        this.x = x;

        this.element = newElement('div', 'barrier-pair');

        this.top = new Barrier(true);
        this.bottom = new Barrier(false);

        this.element.appendChild(this.top.element);
        this.element.appendChild(this.bottom.element);


        this.sortOpening();
        this.setX(x);
    }

    sortOpening() {
        const topHeight = Math.random() * (this.height - this.opening);
        const bottomHeight = this.height - this.opening - topHeight;
        this.top.setHeight(topHeight);
        this.bottom.setHeight(bottomHeight);
    }

    getX() {
        const value = parseInt(this.element.style.left.split('px')[0]);
        return value;
    }

    setX(x) {
        this.element.style.left = `${x}px`;
    }

    getWidth() {
        return this.element.offsetWidth;
    }
}

class Barriers {
    constructor(height, width, opening, space, notifyPoint) {
        this.height = height;
        this.width = width;
        this.opening = opening;
        this.space = space;
        this.notifyPoint = notifyPoint;

        this.pairs = [
            new BarrierPair(height, opening, width),
            new BarrierPair(height, opening, width + space),
            new BarrierPair(height, opening, width + space * 2),
            new BarrierPair(height, opening, width + space * 3),
            new BarrierPair(height, opening, width + space * 4),
            new BarrierPair(height, opening, width + space * 5),
            new BarrierPair(height, opening, width + space * 6),
            new BarrierPair(height, opening, width + space * 7),
            new BarrierPair(height, opening, width + space * 8),
            new BarrierPair(height, opening, width + space * 9),
        ];
    }

    animate() {
        const displacement = 2;

        this.pairs.forEach(
            (pair) => {
                if (pair.getX() > -pair.getWidth()) {
                    pair.setX(pair.getX() - displacement);
                } else {
                    const newX = (pair.getWidth() + this.space * this.pairs.length);
                    pair.sortOpening();
                    pair.setX(newX);
                }

                const middle = this.width / 2;
                if (pair.getX() + displacement >= middle && pair.getX() < middle) {
                    this.notifyPoint();
                }
            }
        );
    }
}

class Bird {
    constructor(heightGame) {
        this.heightGame = heightGame;
        this.flying = false;
        this.element = newElement('img', 'bird');
        this.element.src = '../assets/images/bird.png';

        this.onClick = this.onClick.bind(this);

        document.addEventListener('keydown', this.onClick);
        document.addEventListener('click', this.onClick);

        this.setY(this.heightGame / 2);
    }

    getY() {
        const value = parseInt(this.element.style.bottom.split('px')[0]);
        return value;
    }

    setY(y) {
        this.element.style.bottom = y + 'px';
    }

    onClick() {
        this.flying = true;
        setTimeout(() => {
            this.flying = false;
        }, 150);
    }

    animate() {
        const newY = this.getY() + (this.flying ? 8 : -5);
        const maxHeight = this.heightGame - this.element.offsetHeight;

        if (newY <= 0) {
            this.setY(0);
        } else if (newY >= maxHeight) {
            this.setY(maxHeight);
        } else {
            this.setY(newY);
        }
    }
}

class Progress {
    constructor() {
        this.element = newElement('span', 'progress');
        this.updatePoint(0);
    }

    updatePoint(point) {
        this.element.innerHTML = point;
    }
}

class Collision {
    constructor(bird, barriers) {
        this.bird = bird;
        this.barriers = barriers;

    }

    overlapping(elementA, elementB) {
        const a = elementA.getBoundingClientRect();
        const b = elementB.getBoundingClientRect();

        const horizontal = (a.left + a.width) >= b.left && (b.left + b.width) >= a.left;
        const vertical = (a.top + a.height) >= b.top && (b.top + b.height) >= a.top;

        return horizontal && vertical;
    }

    collided() {
        let collided = false;
        this.barriers.pairs.forEach((barriersPair) => {
            if(!collided) {
                const top = barriersPair.top.element;
                const bottom = barriersPair.bottom.element;
                const bird = this.bird.element;
                collided = this.overlapping(bird, top) || this.overlapping(bird, bottom);
            }
        });

        return collided;
    }
}

class FlappyBird {
    constructor() {
        let points = 0;
        this.gameArea = document.querySelector('[flappy]');
        const gameHeight = this.gameArea.offsetHeight;
        const gameWidth = this.gameArea.offsetWidth;

        const progress = new Progress();
        const barriers = new Barriers(
            gameHeight,
            gameWidth,
            230,
            400,
            () => progress.updatePoint(++points)
        );

        const bird = new Bird(gameHeight);
        this.collision = new Collision(bird, barriers);

        this.initGame(bird.element);
        this.initGame(progress.element);
        this.animateGame(barriers, bird);
    }

    initGame(element) {
        this.gameArea.appendChild(element)
    }

    animateGame(barriers, bird) {
        const timer = setInterval(() => {
            barriers.animate();
            bird.animate();
            if(this.collision.collided()) {
                clearInterval(timer);
            }
        }, 20);

        barriers.pairs.forEach(
            (pair) => {
                this.gameArea.appendChild(pair.element);
            }
        );
    }
}

new FlappyBird();


