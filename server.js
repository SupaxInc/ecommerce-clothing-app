const express = require('express');
const bodyParser = require('body-parser');
// Path allows to build pathing in directories
const path = require('path');
const compression = require('compression');
const enforce = require('express-sslify');

// Loads the environment variables into our developer environment so we are able to use any env variables created in .env file
if(process.env.NODE_ENV !== 'production') require('dotenv').config();

// Giving stripe the secret key inside .env file
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
// When deployed to Heroku it will use its own PORT environment variable
// If ran on DEV environment then run on port 5000
const port = process.env.PORT || 5000

// Allow gzipped compression for Heroku
app.use(compression());
// Body parser middleware makes sure any of the requests coming in to process the body tag and convert it to JSON
app.use(bodyParser.json());
// URL strings that we are receiving or passing does not contain any special characters
app.use(bodyParser.urlencoded({ extended: true }));


if (process.env.NODE_ENV === 'production') {
    // Re-direct HTTP requests as HTTPS using express-sslify
    // Heroku runs a reverse proxy which makes it hard to detect if the original request was via HTTPS
    // This needs to only be used on production so HTTPS is not required in development
    app.use(enforce.HTTPS({ trustProtoHeader: true}));

    // Serve the static files that that are inside ./client/build
    app.use(express.static(path.join(__dirname, 'client/build')));

    // When a get request is sent from any route, send the static files
    app.get('*', function(req, res) {
        // Send the index.html file that includes all of the front-end code
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// When a user requests for a service-worker.js file, send them the file from the build folder
app.get('/service-worker.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'service-worker.js'));
})

app.post('/payment', (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    };

    // Create a stripe charge based on the request that was sent from client
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).send({ error: stripeErr });
        }
        else {
            res.status(200).send({ success: stripeRes });
        }
    })
});

app.listen(port, error => {
    if (error) throw error;
    console.log('Server running on port ' + port);
})

