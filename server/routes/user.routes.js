import express from "express"
import User from "../models/user.model.js"
import { sendSuccess } from "../utils/response.js"

const userRoutes = express.Router()

userRoutes.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    try {

        if(!name) {
            return res.status(401).json({
                message: "Name is required"
            })
        }

        if(!email) {
            return res.status(401).json({
                message: "Email is required"
            })
        }

        if(!password) {
             return res.status(401).json({
                message: "Password is required"
            })
        }

        const existingUser = await User.find({email})

        if(existingUser) {
            return res.status(400).json({
                message: "User with same email already exists"
            })
        }

        const createdUser = await User.create({
            name, 
            email, 
            password
        }).select("-password")

        return sendSuccess(res, "User Created Successfully", 201,)
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})

export default userRoutes