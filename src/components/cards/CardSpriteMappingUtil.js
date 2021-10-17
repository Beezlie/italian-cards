import cardSpritesFile from '../../assets/images/card_sprites.png';

//TODO - pass in scale as a param so table cards can be smaller than the player hand
export default function getItalianCardSpriteStyle(key) {
    const cardPosition = italianCardSpriteMap[key];
    const originalImageSize = 2090;
    const originalCardWidth = 252;
    const originalCardHeight = 348;
    const scale = 0.3;
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
    s1: { x: 4, y: 1 },
    d1: { x: 5, y: 1 },
    c1: { x: 6, y: 1 },
    b1: { x: 7, y: 1 },

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

    s5: { x: 7, y: 0 },
    d5: { x: 1, y: 1 },
    c5: { x: 1, y: 2 },
    b5: { x: 1, y: 3 },

    s6: { x: 1, y: 4 },
    d6: { x: 1, y: 5 },
    c6: { x: 2, y: 1 },
    b6: { x: 2, y: 2 },

    s7: { x: 2, y: 3 },
    d7: { x: 2, y: 4 },
    c7: { x: 2, y: 5 },
    b7: { x: 3, y: 1 },

    s8: { x: 3, y: 3 },
    d8: { x: 3, y: 4 },
    c8: { x: 3, y: 5 },
    b8: { x: 4, y: 2 },

    s9: { x: 4, y: 4 },
    d9: { x: 4, y: 5 },
    c9: { x: 5, y: 3 },
    b9: { x: 6, y: 3 },

    s10: { x: 5, y: 2 },
    d10: { x: 6, y: 2 },
    c10: { x: 7, y: 2 },
    b10: { x: 4, y: 3 },

    back: { x: 3, y: 2 },
}