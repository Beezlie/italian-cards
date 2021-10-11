import cardSpritesFile from '../../assets/images/card_sprites.png';

export default function getItalianCardSpriteStyle(key) {
    const cardPosition = italianCardSpriteMap[key];
    const originalImageSize = 2090;
    const originalCardWidth = 252;
    const originalCardHeight = 348;
    const scale = 0.4;
    const xPos = cardPosition.x * (-1) * originalCardWidth * scale;
    const yPos = cardPosition.y * (-1) * originalCardHeight * scale;

    return {
        backgroundImage: `url(${cardSpritesFile})`,
        backgroundPosition: `${xPos}px ${yPos}px`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: `${originalImageSize * scale}px ${originalImageSize * scale}px`,
        width: originalCardWidth * scale,
        height: originalCardHeight * scale,
    };
}

const italianCardSpriteMap = {
    s2: { x: 0, y: 0 },
    d2: { x: 0, y: 1 },
    c2: { x: 0, y: 2 },
    b2: { x: 0, y: 3 },
    s3: { x: 0, y: 4 },
    d3: { x: 0, y: 5 },
    c3: { x: 1, y: 0 },
    b3: { x: 2, y: 0 },
    s4: { x: 3, y: 0 },
    d4: { x: 4, y: 0 },
    c4: { x: 5, y: 0 },
    b4: { x: 6, y: 0 },
    back: { x: 3, y: 2 },
}