const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        return User.find();
      },
  
      user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },

      // By adding context to our query, we can retrieve the logged in user without specifically searching for them
      me: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id });
        }
        throw new AuthenticationError('You need to be logged in!');
      }
    }, 
  
    Mutation: {
      addUser: async (parent, { name, email, password }) => {
        const user = await User.create({ name, email, password });
        const token = signToken(user);
  
        return { token, user };
      },
      login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
  
        if (!user) {
          throw new AuthenticationError('No user with this email found!');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect password!');
        }
  
        const token = signToken(user);
        return { token, user };
      },
  
      // addBook: async (parent, { userId, bookInput }) => {
      //   return User.findOneAndUpdate(
      //     { _id: userId },
      //     {
      //       $addToSet: { books: book },
      //     },
      //     {
      //       new: true,
      //       runValidators: true,
      //     }
      //   );
      // },
      // removeUser: async (parent, { userId }) => {
      //   return User.findOneAndDelete({ _id: userId });
      // },
      // removeBook: async (parent, { userId, book }) => {
      //   return Profile.findOneAndUpdate(
      //     { _id: userId },
      //     { $pull: { books: book } },
      //     { new: true }
      //   );
      // },
    },
  };
  
  module.exports = resolvers;