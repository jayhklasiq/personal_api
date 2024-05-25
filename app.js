const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const connectDB = require('./data/connect')
const appRoutes = require('./routes/appRoute');
require('dotenv').config();
const swaggerOutput = require('./swagger-output.json');
const swaggerUi = require('swagger-ui-express');


const app = express();
const PORT = 5500;

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

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

// Define Routes
app.use('/', appRoutes);
// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true // Enable the GraphiQL UI
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
