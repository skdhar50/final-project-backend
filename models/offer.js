const { Schema, model } = require("mongoose");

const OfferSchema = Schema({});

const Offer = model("offers", OfferSchema);

module.exports.Offer = Offer;
