const Subscription = require("../models/subscriptionModel");

// get all Subscriptions
const getSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Add one Subscription
const addSubscription = async (req, res) => {
  // console.log();
  try {
    const { plan, price, duration } = req.body;
    const user_id = req.user._id;
    const newSubscription = new Subscription({ plan, price, duration, user_id });
    await newSubscription.save();
    res.status(201).json(newSubscription);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get Subscription by ID
const getSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findById(id);
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete Subscription by ID
const deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByIdAndDelete({ _id: id });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json({ message: "Subscription deleted successfully" });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete all Subscriptions
const deleteAllSubscriptions = async (req, res) => {
  try {
    const result = await Subscription.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Update Subscription by ID
const updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubscription = req.body;
    // const subscription = await Subscription.findOneAndUpdate({ _id: id }, updatedSubscription);
    const subscription = await Subscription.findOneAndUpdate({ _id: id }, updatedSubscription, { new: true });

    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found" });
    }
    res.status(200).json(subscription);
  } catch (error) {
    console.error("Error rendering index.html:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getSubscriptions,
  addSubscription,
  getSubscription,
  deleteSubscription,
  deleteAllSubscriptions,
  updateSubscription,
};