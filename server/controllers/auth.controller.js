import User from "../models/user.model.js"
import { sendError, sendSuccess } from "../utils/response.js"

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

const registerUser = async (req, res) => {
  const { name, email, password } = req.body
  try {
    if (!name) {
      return sendSuccess(res, "Name is required", 400, {
        status: "failure",
      })
    }

    if (!email) {
      return sendSuccess(res, "Email is required", 400, {
        status: "failure",
      })
    }

    if (!password) {
      return sendSuccess(res, "Password is required", 400, {
        status: "failure",
      })
    }

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return sendSuccess(res, "User with same email already exists", 400, {
        status: "failure",
      })
    }

    await User.create({
      name,
      email,
      password,
    })

    return sendSuccess(res, "User Created Successfully", 201, {
      status: "success",
      message: "User Created successfully",
    })
  } catch (error) {
    return sendError(res, "Internal Server error", 500, {
      status: "failure",
      message: "Internal Server error",
    })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email) {
      return sendError(res, "Email is required", 401, {
        status: "failure",
      })
    }
  
    if (!password) {
      return sendError(res, "Password is required", 401, {
        status: "failure",
      })
    }
  
    const user = await User.findOne({email})
  
    if(!user) {
      return sendError(res, "Email not found", 404, {
          status: "failure", 
          message: "Email not found"
      })
    }
  
    const isPasswordCorrect = await user.matchPasswords(password)
  
    if(!isPasswordCorrect) {
      return sendError(res, "Incorrect Password", 401)
    }
  
    const token = await generateToken(user._id)

    return sendSuccess(res, "User Logged In successfully", 200, {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return sendError(res, "Internal Server Error", 500)
  }
}

export { registerUser, loginUser }
