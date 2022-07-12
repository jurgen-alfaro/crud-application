const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/", require("./routes/routes"));

app.listen(3001, () => console.log("Server running on port 3001"));
