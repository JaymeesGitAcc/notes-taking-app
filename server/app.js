import express from "express"
import authRoutes from "./routes/auth.routes.js"

const app = express()

app.use(express.json())

app.get("/health", (_, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is running"
    })
})

app.use("/api/auth", authRoutes)


export default app