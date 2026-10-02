const travel = async (req, res) => {
    const tripsEndpoint = 'http://localhost:3000/api/trips';

    const options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };

    fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            res.render('travel', {
                title: 'Travlr Getaways',
                trips: json
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travel
};