const bodyParser = require('body-parser');
const app = require('./app');

const users = require('./routes/user.route');


app.use(bodyParser.json());
app.use('/v1/auth', users);

const port = process.env.PORT || 2500;
app.listen(port, console.log(`Listening to port ${port}...`));
