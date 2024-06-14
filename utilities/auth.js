const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const resolver = require('../graphql/resolvers');
const connectDB = require('../data/connect');
const { ObjectId } = require('mongodb'); // Import ObjectId

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "https://diagnosis-api-gk2d.onrender.com/auth/google/callback",
  passReqToCallback: true
},
  async function (request, accessToken, refreshToken, profile, done) {
    try {
      // Correctly use email to find the user
      let user = await resolver.getUser({ email: profile.email });

      if (!user) {
        user = await resolver.createUser({
          username: profile.displayName,
          email: profile.email,
          googleId: profile.id
        });
        console.log("New User Created:", user.id, user.googleId);
      } else {
        console.log("User already exists:", user._id);
      }
      // console.log("Profile:", profile);
      return done(null, user);
    } catch (error) {
      console.error("Error in authentication:", error);
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    // Fetch user from MongoDB using id
    const user = await resolver.getUserById({ id: new ObjectId(id) }); // Use new ObjectId(id)
    done(null, user);
  } catch (error) {
    done(error);
  }
});
