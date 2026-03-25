// draw one cell and handle clicks
// Cell represents one square on the board and how it is displayed
function Cell({ p_value, p_onClick, p_canToggle, p_isWrong }) {
    return (
        <td
            // only allow click if the square is toggleable
            onClick={p_canToggle ? p_onClick : null}
            style={{
                width: "60px",
                height: "60px",
                border: "1px solid black",
                textAlign: "center",
                cursor: p_canToggle ? "pointer" : "default",
                fontSize: "24px",
                fontWeight: "bold",
                backgroundColor: p_isWrong ? "#ff6b6b" : (p_canToggle ? "white" : "#4e4d4d") //now has different colours for when theres an error or not
            }}
        >
            {p_value}
        </td>
    );
}

export default Cell;