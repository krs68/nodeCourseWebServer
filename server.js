const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT | 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});
// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Mode',
//         pageBody: 'Site is in Maintenance mode, please visit later'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('upperCase', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>Get: Hello Express!</h1>');
    // res.send({
    //     name: 'Ravi',
    //     likes: [
    //         'Running',
    //         'Swimming',
    //         'Spinning',
    //         'Skiing'
    //     ]
    // })
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        pageBody: 'My First Home Page'
    });

});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    var errorMessage = ({
        errorCode: -2000,
        errorMessage: 'Bad Request',
        errorDetails: 'Cannot figure out what the error is',
        errorPlace: 'server.js: line 28'
    });
    res.send(errorMessage);
});


app.post('/', (req, res) => {
    res.send('<h1>Post: Hello Express!</h1>');
});

app.listen(port, () => {
    console.log(`Starting Server on port ${port}...`);
});

