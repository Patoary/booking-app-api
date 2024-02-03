//external imports
const jwt = require("jsonwebtoken");

//internal imports
const createError = require("../../utils/error");
const createHttpError = require("http-errors");

// verify Token
const verifyToken = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

  const token = cookies[process.env.COOKIE_NAME];
  if (!token) {
    return next(
      createHttpError(401, "You are not authenticated you have no token")
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(createHttpError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

// verify user is valid or not
const verifyUser = (req, res, next) => {
  // first of all check token
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createHttpError(403, "You are not authorized!"));
    }
  });
};

// verify admin or not
const verifyAdmin = (req, res, next) => {
  // first of all check token
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createHttpError(403, "You are not authorized!"));
    }
  });
};

module.exports = {
  verifyToken,
  verifyUser,
  verifyAdmin,
};
// export const verifyAdmin = (req, res, next) => {
//   verifyToken(req, res, next, () => {
//     if (req.user.isAdmin) {
//       next();
//     } else {
//       return next(createError(403, "You are not authorized!"));
//     }
//   });
// };
