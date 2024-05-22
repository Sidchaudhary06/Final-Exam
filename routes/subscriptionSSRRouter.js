// // router.js

const express = require("express");
const router = express.Router();
// controller functions
const blogSSR = require("../controllers/subscriptionSSRController");
const verifyToken = require("../middlewares/requireAuthSSR")

// require auth for all routes
router.use(verifyToken)

// SSR
// End1: Route to render index.html with subscriptions using EJS
router.get("/", blogSSR.renderSubscriptions);
// End2: Define a route to render the addsubscription.ejs view
router.get("/addsubscription", blogSSR.renderForm);
// End3:Route to add  subscription using EJ
router.post("/addsubscription", blogSSR.addSubscription);
// Define a route to render the singlesubscription.ejs view
router.get("/single-subscription/:id", blogSSR.renderSubscription);
// Define a route to delete singlesubscription
router.delete("/single-subscription/:id", blogSSR.deleteSubscription);
// Define a route to update single subscription.ejs
router.put("/single-subscription/:id", blogSSR.updateSubscription);
// Define subscription to update
router.get("/single-subscription/update/:id", blogSSR.renderUpdateSubscription);

module.exports = router;