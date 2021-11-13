import PropTypes from 'prop-types';
import Card from './Card';
import CardSelector from './CardSelector';

const TableCard = (props) => {
    const { cardKey, playerCardSelected, handleCardSelection, resetCardSelection } = props;

    return (
        <div>
            <CardSelector
                cardKey={cardKey}
                isSelectable={playerCardSelected.length !== 0}
                handleCardSelection={handleCardSelection}
                resetCardSelection={resetCardSelection}
            >
                <Card
                    cardKey={cardKey}
                />
            </CardSelector>
        </div>
    );
};

TableCard.propTypes = {
    cardKey: PropTypes.string,
    playerCardSelected: PropTypes.string,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default TableCard;