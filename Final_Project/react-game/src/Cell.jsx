// draw one cell and handle clicks
//Cell represetns one square on the board and how it is displayed
function Cell({ p_value, p_onClick, p_canToggle }) {
    return (
        <td
            onClick={p_canToggle ? p_onClick : null} // only clickable if allowed
            style={{
                width: "60px",
                height: "60px",
                border: "1px solid black",
                textAlign: "center",
                cursor: p_canToggle ? "pointer" : "default",
                fontSize: "24px",
                backgroundColor: p_canToggle ? "white" : "#ddd" //show locked cells
            }}
        >
            {p_value}
        </td>
    );
}

export default Cell;