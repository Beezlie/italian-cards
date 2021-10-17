const ScoreBoard = () => {

    let id = 0;
    function createData(option, type) {
        id += 1;
        return { id, option, type };
    }

    let totalScoreRows = [
        createData('Us', '5'),
        createData('Them', '3'),
    ];

    let roundScoreRows = [
        createData('Cards', '5'),
        createData('Sette Bello', '0'),
        createData('Dinare', '3'),
        createData('Scopa', '1'),
    ];

    return (
        <div>
            <table className='score-board'>
                <th className='score-board-header'>Total Score</th>
                {totalScoreRows.map(row => (
                    <tr key={row.id}>
                        <td>{row.option}</td>
                        <td>{row.type}</td>
                    </tr>
                ))}
            </table>
            <table className='score-board'>
                <th className='score-board-header'>Current Round Score</th>
                {roundScoreRows.map(row => (
                    <tr key={row.id}>
                        <td className='score-board-data'>{row.option}</td>
                        <td className='score-board-data'>{row.type}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default ScoreBoard;