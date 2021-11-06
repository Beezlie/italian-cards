import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from "./Modal";

//TODO - also show opposite team round score
const ScoreModal = (props) => {
    const { roundScore } = props;
    const [show, setShow] = useState(false);

    const createData = (id, label, value) => {
        return { id, label, value };
    }

    const getRoundScoreRows = () => {
        let id = 0;
        let rows = [];
        for (const [key, value] of Object.entries(roundScore)) {
            rows.push(createData(id, key, value));
            id++;
        }
        return rows;
    }

    const getRoundScoreTable = () => {
        return (
            <table className='round-score'>
                {getRoundScoreRows().map(row => (
                    <tr key={row.id}>
                        <td className='score-board-data'>{row.label}</td>
                        <td className='score-board-data'>{row.value}</td>
                    </tr>
                ))}
            </table>
        );
    }

    useEffect(() => {
        setShow(true);
    }, [roundScore]);

    return (
        <Modal title="Round Score" onClose={() => setShow(false)} show = { show } >
            {getRoundScoreTable()}
        </Modal>
    );
}

ScoreModal.propTypes = {
    roundScore: PropTypes.object,
};

const mapStateToProps = function (state) {
    const { game } = state;
    return {
        roundScore: game.roundScore,
    };
};

export default connect(mapStateToProps)(ScoreModal);