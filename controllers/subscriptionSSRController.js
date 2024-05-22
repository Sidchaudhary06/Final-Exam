const Subscription = require("../models/subscriptionModel");

// Render Controller: Render index.html with subscriptions using EJS
const renderSubscriptions = async (req, res) => {
  const user_id = req.user._id
  try {
    const subscriptions = await Subscription.find({user_id}).sort({createdAt: -1});
    res.render("index", { subscriptions }); // Render index.ejs with subscriptions data
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).render("error");
  }
};

// Get Subscription by ID
const renderSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const subscription = await Subscription.findById(id).where('user_id').equals(user_id);
    if (!subscription) {
      return res.render("notfound");
    }
    res.render("singlesubscription", { subscription }); // Render index.ejs with 
  } catch (error) {
    console.error("Error rendering Subscription:", error);
    res.status(500).render("error");
  }
};
 
const renderForm = (req, res) => {
  try {
    res.render("addsubscription"); // Assuming "addsubscription.ejs" is located in the "views" directory
  } catch (error) {
    console.error("Error rendering form", error);
    res.status(500).render("error");
  }
};

// Controller function to handle adding a new subscription (used for rendering and API)
const addSubscription = async (req, res) => {
  try {
    const { plan, price, duration } = req.body;
    const user_id = req.user._id;
    // Convert the achieved field to a Boolean
    const achieved = req.body.achieved === "on";
    const newSubscription = new Subscription({ plan, price, duration, user_id });
    await newSubscription.save();
    // Redirect to the main page after successfully adding the subscription
    console.log("Subscription added successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error adding subscription:", error);
    res.status(500).render("error");
  }
};

// Delete Subscription by ID
const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    const subscription = await Subscription.findByIdAndDelete({ _id: id,user_id: user_id });
    if (!subscription) {
      return res.status(404).render("notfound");
    }
    console.log("Subscription delted successfully");
    res.redirect("/"); // Adjust the URL as needed
  } catch (error) {
    console.error("Error deleteing Subscription:", error);
    res.status(500).render("error");
  }
};


// Update Subscription by ID
const renderUpdateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
     
    // Fetch the subscription by id
    const subscription = await Subscription.findById(id);

    if (!subscription) {
      return res.render("notfound");
    }

    // Render the singlesubscription.ejs template with the subscription data
    res.render("updatesubscription", { subscription });

  } catch (error) {
    console.error("Error fetching Subscription:", error);
    res.status(500).render("error");
  }
};

// Handle POST request to update the subscription
const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.user._id;
    //const achieved = req.body.achieved === "on";
    const { plan, price, duration } = req.body;
    const updatedSubscriptionData = { plan, price, duration };

    // Update the subscription with the new data
    const updatedSubscription = await Subscription.findOneAndUpdate({ _id: id, user_id: user_id }, updatedSubscriptionData, { new: true });

    if (!updatedSubscription) {
      return res.render("notfound");
    }

    // console.log("Subscription updated successfully");

    // Redirect to /
    res.redirect("/");

  } catch (error) {
    console.error("Error updating Subscription:", error);
    res.status(500).render("error");
  }
};

module.exports = {
  renderSubscriptions,
  renderSubscription,
  addSubscription,
  renderForm,
  deleteSubscription,
  updateSubscription,
  renderUpdateSubscription,
};
