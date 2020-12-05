const express = require('express');
const exphbs = require('express-handlebars');
const members = require('./Members')
const logger = require('./middleware/logger')
// nodemon will look out for changes and automatically reload server
const path = require('path');
const { title } = require('process');
const app = express();


// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Init middleware
app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('index', {
    title: 'Member App',
    members
}));

// set static folder
// app.use() is for when we want to use middleware
// app.use(express.static(path.join(__dirname, 'public')));

// Members API Route
app.use('/api/members', require('./routes/api/members'))

const PORT = process.env.PORT || 5000; // when deploy the server will most likely have its own port



app.listen(PORT, () => console.log(`Server started on port ${PORT}`));