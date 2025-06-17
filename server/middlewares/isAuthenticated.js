import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res,next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ messagae: "User Not Authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.SECRETE_KEY);
    if (!decoded) {
      return res
        .status(401)
        .json({ messagae: "Invalid Token", success: false });
    }

    req.id = decoded.userId

    next();
  } catch (error) {
    console.log(error)

  }
};


export default isAuthenticated;
