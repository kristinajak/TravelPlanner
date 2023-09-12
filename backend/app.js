const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user");
const checklistRoutes = require("./routes/checklist");
const itineraryRoutes = require("./routes/itinerary");
const budgetRoutes = require("./routes/budget");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

app.use(cookieParser());
app.use(
  session({
    name: "session-cookie",
    secret: "sthrth565h6s2hrt6",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(userRoutes);
app.use(checklistRoutes);
app.use(itineraryRoutes);
app.use(budgetRoutes);

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
