const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
var cors = require('cors')

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors())

app.use(express.json());

//ROUTE FOR CONTACT

app.use("/api/contacts", require("./routes/contactRoutes"));

//ROUTE FOR USER (LOGIN/Signin)

app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

//ROUTES FOR THEATRE

app.use("/api/theatres",require("./routes/theaterRoutes"));

//ROUTE FOR SHOW
app.use("/api/shows",require("./routes/showRoutes"));

//ROUTES FOR MOVIE
app.use("/api/movies",require("./routes/movieRoutes"));

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});