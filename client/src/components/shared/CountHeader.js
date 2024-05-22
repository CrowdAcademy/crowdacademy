function CountHeader({ name, count }) {
    return (
        <>
            <h3 className="questions-container-header">{name} ({count})</h3>
            <div className="hr"></div>
        </>
    )
}


export default CountHeader;