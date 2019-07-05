const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//passport config
require('./config/passport')(passport);

//load routes
const auth = require('./routes/auth');
const index = require('./routes/index');

//map global promises
mongoose.Promise = global.Promise;

//mongoose connect
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {console.log('MongoDB Connected')}
    )
    .catch(err => {console.log(err)});

const app = express();

//handlebars middleware
app.engine('handlebars', exphbs({
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
})

app.use('/', index);
app.use('/auth', auth);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('Server is running...')
})