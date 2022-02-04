import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from "./Modal";

const ScoreModal = (props) => {
    const { teamScore, roundScore, team, gameStarted } = props;
    const [show, setShow] = useState(false);

    const createData = (id, label, value1, value2) => {
        return { id, label, value1, value2 };
    }

    // TODO - highlight the cells with the higher score. Also include a row for total score
    const getRoundScoreRows = () => {
        let id = 0;
        let rows = [];
        const usRoundScore = roundScore[team];
        const themRoundScore = roundScore[1 - team];
        for (const key of Object.keys(usRoundScore)) {
            rows.push(createData(id, key, usRoundScore[key], themRoundScore[key]));
            id++;
        }
        rows.push(createData(id, "Total", teamScore[team], teamScore[1 - team]));
        return rows;
    }

    //TODO - remove team as a condition here - it's only temporary
    const getRoundScoreTable = () => {
        if (shouldDisplayScore()) {
            return (
                <table className='round-score'>
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Us</th>
                            <th>Them</th>
                        </tr>
                    </thead>
                    <tbody>
                    {getRoundScoreRows().map(row => (
                        <tr key={row.id}>
                            <td className='score-board-data'>{row.label}</td>
                            <td className='score-board-data'>{row.value1}</td>
                            <td className='score-board-data'>{row.value2}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            );
        }
    }

    const shouldDisplayScore = () => {
        return gameStarted && teamScore.length;
    }

    useEffect(() => {
        if (shouldDisplayScore()) {
            setShow(true);
        }
    }, [roundScore, gameStarted]);

    return (
        <Modal title="Score" onClose={() => setShow(false)} show = { show } >
            {getRoundScoreTable()}
        </Modal>
    );
}

ScoreModal.propTypes = {
    teamScore: PropTypes.array,
    roundScore: PropTypes.array,
    team: PropTypes.number,
    gameStarted: PropTypes.bool,
};

const mapStateToProps = function (state) {
    const { game, room } = state;
    return {
        teamScore: game.teamScore,
        roundScore: game.roundScore,
        team: game.team,
        gameStarted: room.gameStarted,
    };
};

export default connect(mapStateToProps)(ScoreModal);