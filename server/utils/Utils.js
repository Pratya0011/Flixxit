import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export const authenticateToken = (req, res, next) => {
  let accessToken = req.header("access");
  let refreshToken = req.header("refresh");
  if (!accessToken) {
    return res.status(401).send({ message: "Access not allowed" });
  } else {
    jwt.verify(accessToken, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          if (!refreshToken) {
            return res
              .status(401)
              .send({ message: "Access not allowed" });
          } else {
            jwt.verify(
              refreshToken,
              process.env.JWT_REFRESHSECRET,
              (err, user) => {
                if (err) {
                  return res.send({
                    status: 502,
                    name: err.name,
                    message: "Session Expired",
                  });
                } else {
                  const newAccessToken = jwt.sign(
                    { userId: user._id },
                    process.env.JWT_SECRET,
                    { expiresIn: "1m" }
                  );
                  res.send({
                    status: 200,
                    accessToken: newAccessToken,
                    message: "Access Allowed",
                  });
                  next();
                }
              }
            );
          }
        } else {
          return res.status(500).send({ message: "Access not allowed" });
        }
      } else {
        res.send({
          status: 200,
          accessToken: accessToken,
          message: "Access Allowed",
        });
        next();
      }
    });
  }
};
