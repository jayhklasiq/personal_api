require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./data/connect');
const appRoutes = require('./routes/appRoute');
const swaggerOutput = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const passport = require('passport');
const session = require('express-session');

// Load Passport configuration
require('./utilities/auth');

const app = express();

// Set the view engine to EJS & set it to use EJS layouts
app.set('view engine', 'ejs');
app.use(expressLayout);
app.set('layout', './layout/layout');

// Parse JSON bodies
app.use(express.json());
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Initialize and configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// Initialize Passport and configure it to use sessions
app.use(passport.initialize());
app.use(passport.session());

// Define Routes
app.use('/', appRoutes);

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true // Enable the GraphiQL UI
}));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = 5500
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
