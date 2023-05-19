const { User, Algos } = require('../models')
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id })
            }
            throw new AuthenticationError('You must be logged in.')
        },
        algo: async (parent, args) => {
            console.log(args)
            return Algos.findOne({ number: args.number })
        },
        algos: async () => {
            return Algos.find()
        }
    },
    Mutation: {
        login: async (parent, args) => {
            const user = await User.findOne({ username: args.username });
            if (!user) {
                throw new AuthenticationError('Username not found.');
            }
            const correctPw = await user.isCorrectPassword(args.password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect password.');
            }
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return { token, user };
        },
        addAlgo: async (parent, args) => {
            const algo = await Algos.create(args);
            return algo;
        },
    }
}

module.exports = resolvers;