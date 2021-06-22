const config = require('config');
const express = require('express');
const app = express();
app.use(express.json());
app.use('/api/papaj',express.static(__dirname+'/html-css/Strona 2/'));

const helmet = require('helmet');
app.use(helmet());

const debug = require('debug')('app:debug');

const morgan = require('morgan');
if(app.get('env')==='development'){
    debug('   [DEVELOPMENT]   ');
    app.use(morgan('tiny'));
};

const courses = require('./routes/courses');
const main = require('./routes/main');
app.use('/api/courses', courses);
app.use('/',main);

app.set('view engine','pug');
app.set('views','./views');
// CONFIG

console.log(`Application Name: ${config.get('name')}`);
console.log(`Date: ${config.get('date.day')}-${config.get('date.month')}-${config.get('date.year')}`);

// PORT
const port = process.env.PORT || 3000;
app.listen(port,"localhost",()=>{
    console.log(`Listening on port ${port}...`);
});