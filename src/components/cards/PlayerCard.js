import PropTypes from 'prop-types';
import ReactCardFlip from 'react-card-flip';
import Card from './Card';
import CardSelector from './CardSelector';

const PlayerCard = (props) => {
    const { cardKey, isFlipped, handleCardSelection, resetCardSelection } = props;

    return (
        <div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <div>
                    <Card
                        cardKey={"back"}
                    />
                </div>
                <CardSelector
                    cardKey={cardKey}
                    isSelectable={true}
                    handleCardSelection={handleCardSelection}
                    resetCardSelection={resetCardSelection}
                >
                    <Card
                        cardKey={cardKey}
                    />
                </CardSelector>
            </ReactCardFlip>
        </div>
    );
};

PlayerCard.propTypes = {
    cardKey: PropTypes.string,
    isFlipped: PropTypes.bool,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default PlayerCard;