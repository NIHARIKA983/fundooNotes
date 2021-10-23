const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
},
// (accessToken, refreshToken, profile, done) => {
//   console.log(accessToken);
//   console.log(refreshToken);
//   console.log(profile);
// }
function (request, accessToken, refreshToken, profile, done) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
  // eslint-disable-next-line no-undef
  return done(err, profile);
//   });
}
));

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
