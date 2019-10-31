const app = require('./app');

const port = process.env.PORT || 2500;

app.listen(port, console.log(`Listening to port ${port}...`));
