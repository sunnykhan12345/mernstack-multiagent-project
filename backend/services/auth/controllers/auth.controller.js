import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import redis from "../../../shared/redis/redis.js";

const createSession = async (res, user) => {
  const sessionId = crypto.randomUUID();
  await redis.set(
    `session-${sessionId}`,
    JSON.stringify({
      userId: user._id,
      name: user.name,
      email: user.email,
      avator: user.avator,
    }),
    "EX",
    7 * 24 * 60 * 60,
  );

  res.cookie("session", sessionId, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });
};

export const login = async (req, res) => {
  try {
    console.log("Request received");

    const { token } = req.body;

    console.log("Token:", token);

    const decoded = await getAuth(app).verifyIdToken(token);

    console.log("Decoded:", decoded);

    let user = await User.findOne({
      firebaseUld: decoded.uid,
    });

    console.log("Existing user:", user);

    if (!user) {
      user = await User.create({
        firebaseUld: decoded.uid,
        name: decoded.name,
        email: decoded.email,
        avator: decoded.picture,
      });

      console.log("User created:", user);
      await createSession(res, user);
      return res.status(201).json({
        success: true,
        user,
      });
    }

    // Cache the user so the `protect` middleware can look it up by
    // Firebase uid without hitting Mongo on every request.
    await redis.set(
      `user:firebase:${user.firebaseUld}`,
      JSON.stringify({
        userId: user._id,
        name: user.name,
        email: user.email,
        avator: user.avator,
      }),
      "EX",
      7 * 24 * 60 * 60, // 1 week
    );

    await createSession(res, user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};
// logout
// Token verification already happened in the gateway's `protect` middleware;
// this service only trusts the `x-user-id` header it forwards.
export const logout = async (req, res) => {
  try {
    const sessionId = req.cookies.session;
    await redis.del(`session-${sessionId}`);
    res.clearCookie("session", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

// Returns the currently authenticated user. The gateway already verified
// the token and forwards the resolved Mongo user id via `x-user-id`.
// export const getMe = async (req, res) => {
//   try {
//     const userId = req.headers["x-user-id"];

//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     res.status(200).json({
//       success: true,
//       user,
//     });
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };
