const Holiday = ({ days }) => {

    return (

        <div className="card-deck">
            {days.map((day, index) =>
                <div className="card">
                    <p key={index}>
                        <div className="card-header">{day.date.iso} | {day.name} <br /></div>
                        <p class="card-text">{day.description}</p></p>
                </div>)}

        </div>
    );

};

export default Holiday;