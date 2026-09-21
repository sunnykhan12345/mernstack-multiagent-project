export const getCurrentUser = (req, res, next) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
