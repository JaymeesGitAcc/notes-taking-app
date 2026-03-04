import User from "../models/user.model.js"
import { sendError } from "../utils/response.js"
import jwt from "jsonwebtoken"

const protect = async (req, res, next) => {
  try {
    let token

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1]
    }

    if (!token) {
      return sendError(res, "No token, authorization denied", 401, {
        status: "failure",
      })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken.id).select("-password")

    req.user = user

    next()
  } catch (error) {
    return sendError(res, "Server Error", 500)
  }
}

export { protect }
