import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ScoreBoard = (props) => {

    const createData = (id, label, value) => {
        return { id, label, value };
    }

    const getTeamScoreRows = () => {
        const { team, teamScore } = props;
        let rows = [];
        const opposingTeam = 1 - team;
        rows.push(createData(0, 'Us', teamScore[team]));
        rows.push(createData(1, 'Them', teamScore[opposingTeam]));
        return rows;
    };

    const getRoundScoreRows = () => {
        const { roundScore } = props;
        let id = 0;
        let rows = [];
        for (const [key, value] of Object.entries(roundScore)) {
            rows.push(createData(id, key, value));
            id++;
        }
        return rows;
    };

    if (props.gameStarted) {
        return (
            <div>
                <table className='score-board'>
                    <th className='score-board-header'>Total Score</th>
                    {getTeamScoreRows().map(row => (
                        <tr key={row.id}>
                            <td>{row.label}</td>
                            <td>{row.value}</td>
                        </tr>
                    ))}
                </table>
                <table className='score-board'>
                    <th className='score-board-header'>Current Round Score</th>
                    {getRoundScoreRows().map(row => (
                        <tr key={row.id}>
                            <td className='score-board-data'>{row.label}</td>
                            <td className='score-board-data'>{row.value}</td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    } else {
        return null;
	}
}

ScoreBoard.propTypes = {
    roundScore: PropTypes.object,
    teamScore: PropTypes.array,
    gameStarted: PropTypes.bool,
    team: PropTypes.number,
};

const mapStateToProps = function (state) {
    const { game } = state;
    return {
        roundScore: game.roundScore,
        teamScore: game.teamScore,
        gameStarted: game.gameStarted,
        team: game.team,
    };
};

export default connect(mapStateToProps)(ScoreBoard);