const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");

const blogAPI = require("./controllers/subscriptionAPIController");
const blogSSR = require("./controllers/subscriptionSSRController");

const connectDB = require("./config/db");
const logger = require("./middlewares/logger");

const userSSRRoutes = require("./routes/userSSRRouter");
const subscriptionSSRRouter = require("./routes/subscriptionSSRRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
// Middleware to parse cookies
app.use(cookieParser());

app.use(logger);

// Set views directory for EJS templates
app.set("views", "views");
// Set EJS as the view engine
app.set("view engine", "ejs");
// Serve static files from the "public" directory
app.use(express.static("public"));

// Connect to MongoDB
connectDB();

app.use("/", subscriptionSSRRouter);
app.use("/user", userSSRRoutes);

// SSR
// Route to render index.html with subscriptions using EJS
app.get("/", blogSSR.renderSubscriptions);
// Define a route to render the addsubscription.ejs view
app.get("/addsubscription", blogSSR.renderForm);
// Route to add  subscription using EJ
app.post("/addsubscription", blogSSR.addSubscription);
// Define a route to render the singlesubscription.ejs view
app.get("/single-subscription/:id", blogSSR.renderSubscription);



// API
// GET all Subscriptions
app.get("/api/subscriptions", blogAPI.getSubscriptions);
// POST a new Subscription
app.post("/api/subscriptions", blogAPI.addSubscription);
// GET a single Subscription
app.get("/api/subscriptions/:id", blogAPI.getSubscription);
// Update Subscription using PUT
app.put("/api/subscriptions/:id", blogAPI.updateSubscription);
// DELETE a Subscription
app.delete("/api/subscriptions/:id", blogAPI.deleteSubscription);
// DELETE all Subscription
app.delete("/api/subscriptions", blogAPI.deleteAllSubscriptions);

const PORT = 4000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
