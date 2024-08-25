const mongoose = require('mongoose');

const auctionSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    startPrice: { type: Number, required: true },
    currentHighestBid: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

const Auction = mongoose.model('Auction', auctionSchema);
module.exports = Auction;
