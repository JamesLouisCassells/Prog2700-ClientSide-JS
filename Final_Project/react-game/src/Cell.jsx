// draw one cell and handle clicks
//Cell represents one square on the board and how it is displayed
function Cell({ p_state, p_onClick, p_canToggle, p_isWrong }) {

    //helper function to decide cell colour based on state
    function getCellColor() {
        if (p_state === 1) return "#6fa8dc"; //blue state
        if (p_state === 2) return "#ffffff"; //white state
        return "#d9d9d9"; //empty / neutral state
    }

    return (
        <td
            //this is the react version of addEventListener in dom manipulation
            onClick={p_canToggle ? p_onClick : null}
            style={{
                width: "60px",
                height: "60px",
                border: p_isWrong ? "3px solid red" : "1px solid black",
                cursor: p_canToggle ? "pointer" : "default",
                backgroundColor: getCellColor(),
                opacity: p_canToggle ? "1" : "0.8" //locked cells slightly dulled, not dark grey
            }}
        >
        </td>
    );
}

export default Cell;