const { Schema, model } = require('mongoose');

const algoSchema = new Schema(
    {
        number: {
            type: Number,
            required: true,
        },
        starterCode: {
            type: String,
            required: true
        },
        readMe: {
            type: String,
            required: true
        },
        name: {
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

const Algos = model('Algos', algoSchema);

module.exports = Algos;