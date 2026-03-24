function Cell({ p_value, p_onClick }) {
    return (
        <td
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
            {p_value}
        </td>
    );
}

export default Cell;