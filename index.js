// Import required modules and libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const errorHandler = require("./middlewares/errorMiddleware");
require("dotenv").config();
const routes = require("./routes");

// Create an instance of the Express application
const app = express();

// Middleware configuration
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true, limit: 100000 }));

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));

// injecting error middleware

// Define your routes
app.use(routes);

// Start the server
app.use(errorHandler);
console.log(process.env.PORT);
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
