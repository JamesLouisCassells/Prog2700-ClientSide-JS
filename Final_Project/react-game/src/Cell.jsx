// draw one cell and handle clicks
//Cell represetns one square on the board and how it is displayed
function Cell({ p_value, p_onClick }) {
    return (
        <td
            //this is the react version of addEventListener in dom manipulation
            onClick={p_onClick}
            style={{
                width: "60px",
                height: "60px",
                border: "1px solid black",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "24px"
            }}
        >
             {/* this tells it to display "" or X */}
            {p_value} 
        </td>
    );
}

export default Cell;