const { Schema } = require('mongoose');

const algoSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
        },
        code: {
            type: String,
            required: true
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
)

module.exports = algoSchema;