module.exports = app => {
    app.options('/', (req, res) => res.status(200).end());
    app.get('/', (req, res) => {
        res.status(404).end();
    });

    const urlTemp = 'ccsyb-';


};
