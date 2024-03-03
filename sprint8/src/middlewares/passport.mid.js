import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

import { Users } from '../data/mongo/mongo.manager.js';

import { createHash, verifyHash } from '../../utils/hash.utils.js';
import { createToken } from '../../utils/jtw.utils.js';

const { GOOGLE_ID, GOOGLE_SECRET } = process.env;

passport.use(
  'register',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, email, password, done) => {
      try {
        const searchedUser = await Users.readByEmail(email);

        if (searchedUser) return done(null, false);

        const data = req.body;
        data.password = createHash(password);

        const user = await Users.create(data);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'email' },
    async (req, email, password, done) => {
      try {
        const searchedUser = await Users.readByEmail(email);

        if (
          !searchedUser ||
          !verifyHash(createHash(password), searchedUser.password)
        )
          return done(null, false);

        const token = createToken({ email, role: searchedUser.role });
        req.token = token;

        done(null, searchedUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      passReqToCallback: true,
      callbackURL: 'http://localhost:8080/api/sessions/google/callback',
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_SECRET,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let userData = await Users.readByEmail(1);

        if (!userData) {
          userData = {
            email: profile.id,
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            password: createHash(),
          };

          await Users.create(userData);
        }

        req.session.email = userData.email;
        req.session.role = userData.role;

        done(null, userData);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
