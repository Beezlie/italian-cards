const ScoreBoard = () => {

    let id = 0;
    function createData(option, type) {
        id += 1;
        return { id, option, type };
    }

    let rows = [
        createData('Cards', '5'),
        createData('Sette Bello', '0'),
        createData('Dinare', '3'),
        createData('Scopa', '1'),
    ];

    return (
        <div>
            <table className='total-score mt-2'>
                {rows.map(row => (
                    <tr key={row.id}>
                        <td>{row.option}</td>
                        <td>{row.type}</td>
                    </tr>
                ))}
            </table>
            <table className='current-score mt-2'>
                {rows.map(row => (
                    <tr key={row.id}>
                        <td>{row.option}</td>
                        <td>{row.type}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default ScoreBoard;