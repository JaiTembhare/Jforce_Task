const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        candidate1: {
            type: Number,
            default: 0,

        },
        candidate2: {
            type: Number,
            default: 0,

        },
        candidate3: {
            type: Number,
            default: 0,

        },
        candidate4: {
            type: Number,
            default: 0,
        },

    },
    {
        timestamps: true,
    }
);

const Vote = mongoose.model("Vote", userSchema);
module.exports = Vote;