const bodyParser = require('body-parser');
const app = require('./app');

const users = require('./routes/user.route');
const gifs = require('./routes/gif.route');


app.use(bodyParser.json());
app.use('/v1/auth', users);
app.use('/v1/gifs', gifs);

const port = process.env.PORT || 2500;
app.listen(port, console.log(`Listening to port ${port}...`));
