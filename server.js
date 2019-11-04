const bodyParser = require('body-parser');
const app = require('./app');

const users = require('./routes/user.route');
const gifs = require('./routes/gif.route');
const categories = require('./routes/category.route');


app.use(bodyParser.json());
app.use('/v1/auth', users);
app.use('/v1/gifs', gifs);
app.use('/v1/categories', categories);

const port = process.env.PORT || 2500;
app.listen(port, console.log(`Listening to port ${port}...`));
