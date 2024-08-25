const Auction = require('../models/auctionModel');
const User = require('../models/userModel');

// Create Auction (Admin)
exports.createAuction = async (req, res) => {
    const { itemName, startTime, endTime, startPrice } = req.body;

    const auction = new Auction({
        itemName,
        startTime,
        endTime,
        startPrice,
        currentHighestBid: startPrice,
    });

    try {
        const createdAuction = await Auction.create({
            itemName,
            startTime,
            endTime,
            startPrice,
            currentHighestBid: startPrice,
        });
        res.status(201).json(createdAuction);
    } catch (error) {
        res.status(400).json({ message: 'Invalid auction data' });
    }
};

// Get All Auctions (Admin & User)
exports.getAllAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find();
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Bid on Auction (User)
exports.bidOnAuction = async (req, res) => {
    const { auctionId, bidAmount } = req.body;

    try {
        const auction = await Auction.findById(auctionId);

        if (auction.endTime < new Date()) {
            return res.status(400).json({ message: 'Auction has ended' });
        }

        if (bidAmount <= auction.currentHighestBid) {
            return res.status(400).json({ message: 'Bid must be higher than current highest bid' });
        }

        auction.currentHighestBid = bidAmount;
        auction.userId = req.user._id;
        await auction.save();

        res.json({ message: 'Bid placed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// End Auction and Determine Winner (Admin)
exports.endAuction = async (req, res) => {
    try {
        const auction = await Auction.findById(req.params.id);

        if (auction.endTime > new Date()) {
            return res.status(400).json({ message: 'Auction is still ongoing' });
        }

        const winner = await User.findById(auction.userId);

        res.json({
            message: 'Auction ended successfully',
            winner: winner ? winner.name : 'No winner',
            winningBid: auction.currentHighestBid,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
