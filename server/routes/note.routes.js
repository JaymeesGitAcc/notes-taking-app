import express from "express"
import {
  createNote,
  deleteNote,
  getAllNotes,
  updateNote,
} from "../controllers/notes.controller.js"
import { protect } from "../middlewares/auth.middleware.js"

const noteRoutes = express.Router()

noteRoutes.get("/", protect, getAllNotes)
noteRoutes.post("/", protect, createNote)
noteRoutes.delete("/:id", protect, deleteNote)
noteRoutes.put("/:id", protect, updateNote)

export default noteRoutes
