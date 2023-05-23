const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  console.log('In Token 1');
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if(authHeader && authHeader.startsWith("Bearer")){
    console.log('In Token 2');
    token = authHeader.split(" ")[1];
  }else{
    token = authHeader
  }

  // console.log('Token: ', req.headers);

  if (token) {
    console.log('In Token 3');
    jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401);
        throw new Error("User is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  }else{
      res.status(401);
      throw new Error("User is not authorized or token is missing");
  }
});

module.exports = validateToken;