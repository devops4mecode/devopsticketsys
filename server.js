const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'devops4meglobalthebest2024',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/tickets', require('./routes/tickets'));

// Serve the index.html on the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

let server;

const startServer = () => {
  server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

const closeServer = () => {
  return new Promise((resolve, reject) => {
    if (server) {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();  // No log message here
        }
      });
    }
  });
};

module.exports = { app, startServer, closeServer };
