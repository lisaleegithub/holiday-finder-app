const Holiday = ({ days }) => {

    return (
        <div className="card-deck">
            {days.map((day, index) =>
                <div className="card" style={{margin:"0.5rem"}}>
                    <p key={index}>
                        <div className="card-header" style={{textAlign:"left"}}>{day.date.iso} | {day.name} <br /></div>
                        <p className="card-text" style={{textAlign:"left", margin:"0.5rem 1rem"}}>{day.description}</p></p>
                </div>)}

        </div>
    );

};

export default Holiday;