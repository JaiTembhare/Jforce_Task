const asyncHandler = require("express-async-handler");
const Vote = require("../models/voteModel");
const expressAsyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const doVote = asyncHandler(async (req, res) => {
    const { vote } = req.body;
    const user = req.user;

    // Check if the user has already voted
    if (user.isVoted) {
        res.status(400);
        throw new Error("User has already voted");
    }

    // Validate the vote option
    if (vote < 1 || vote > 4 || !Number.isInteger(vote)) {
        res.status(400);
        throw new Error("Invalid vote option");
    }

    // Update the vote count based on the user's choice
    const updateField = `candidate${vote}`;
    await Vote.findOneAndUpdate({}, { $inc: { [updateField]: 1 } });

    // Update the user to mark that they have voted
    user.isVoted = true;
    await user.save();

    res.status(200).json({ success: true, message: "Vote recorded successfully" });
});


const getVoteList = asyncHandler(async (req, res) => {
    const user = req.user;

    // Check if the user is an admin
    if (!user.isAdmin) {
        res.status(403);
        throw new Error("You do not have permission");
    }

    try {
        // Retrieve the vote list if the user is an admin
        const votesList = await Vote.find();
        res.status(200).json(votesList);
    } catch (error) {
        res.status(500); // Unexpected server error
        throw new Error("Unexpected error occurred");
    }
});

module.exports = {
    doVote: doVote,
    getVoteList: getVoteList
};
