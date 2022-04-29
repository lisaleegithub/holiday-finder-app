const Holiday = ({ days }) => {

    return (
        <div>
            {days.map((day, index) =>
                <p key={index}>
                    {day.name}<br />
                    {day.description}<br />
                    {day.date.iso} </p>
            )}
        </div>
    );

};

export default Holiday;