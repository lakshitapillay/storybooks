const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');
const index = require('./routes/index');
const stories = require('./routes/stories');

//hbs helpers
const {truncate, stripTags, formatDate, editIcon, select} = require('./helpers/hbs');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {console.log('MongoDB Connected')}
    )
    .catch(err => {console.log(err)});

const app = express();

//bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//method override middleware
app.use(methodOverride('_method'));

//handlebars middleware
app.engine('handlebars', exphbs({
    helpers: {
        truncate: truncate,
        stripTags: stripTags,
        formatDate: formatDate,
        select:select,
        editIcon: editIcon
    },
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

app.use(cookieParser())
//express-session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//set global vars
app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);
app.use('/stories', stories)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running...')
})