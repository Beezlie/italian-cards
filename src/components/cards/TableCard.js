import PropTypes from 'prop-types';
import Card from './Card';
import CardSelector from './CardSelector';

const TableCard = (props) => {
    const { cardKey, cardSelection, handleCardSelection, resetCardSelection } = props;

    return (
        <div className='table-card'>
            <CardSelector
                cardKey={cardKey}
                cardSelection={cardSelection}
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
    cardSelection: PropTypes.array,
    handleCardSelection: PropTypes.func,
    resetCardSelection: PropTypes.func,
};

export default TableCard;