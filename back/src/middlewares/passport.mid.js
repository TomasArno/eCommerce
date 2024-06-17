import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import users from "../repositories/users.rep.js";

import { createHash } from "../utils/hash.utils.js";
import { createToken } from "../utils/jtw.utils.js";
import sendEmailCode from "../utils/sendEmail.utils.js";
import errors from "../utils/errors/errorsLibrary.utils.js";

import addLog from "../utils/logs/addLog.utils.js"
import logsLibrary from "../utils/logs/logsLibrary.utils.js"

const { GOOGLE_ID, GOOGLE_SECRET, SECRET_JWT } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const searchedUser = await users.readByEmail(email);

        if (searchedUser?._id)
          return done(null, false, {
            message: "User already registered",
            statusCode: 400,
          });

        const user = await users.create(req.body);
        addLog(user._id, logsLibrary.signUp)

        sendEmailCode(user.email, user.verifyCode);

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const searchedUser = await users.readByEmail(email);

        if (!searchedUser?._id) return done(null, false, errors.notFound);

        if (createHash(password) != searchedUser.password)
          return done(null, false, errors.auth);

        if (!searchedUser.isVerified)
          return done(null, false, errors.notVerified);

        const { password: pass, verifyCode, __v, isVerified, ...user } = searchedUser // Le desestructuro lo que NO tiene que ver el usuario

        req.token = createToken({ email, role: searchedUser.role });
        req.user = user;
        addLog(user._id, logsLibrary.logIn)

        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.use(
//   "jwt",
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => req?.cookies["token"],
//       ]),
//       secretOrKey: SECRET_JWT,
//     },
//     async (payload, done) => {
//       try {
//         const userData = await users.readByEmail(payload.email);

//         if (!userData) return done(null, false);

//         delete userData.password;

//         done(null, userData);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       passReqToCallback: true,
//       callbackURL: "http://localhost:8080/api/sessions/google/callback",
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_SECRET,
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         let userData = await users.readByEmail(1);

//         if (!userData) {
//           userData = {
//             email: profile.id,
//             name: profile.name.givenName,
//             photo: profile.coverPhoto,
//             password: createHash(),
//           };

//           await users.create(userData);
//         }

//         req.token = createToken({ email, role: searchedUser.role });

//         done(null, userData);
//       } catch (error) {
//         done(error);
//       }
//     }
//   )
// );

export default passport;
