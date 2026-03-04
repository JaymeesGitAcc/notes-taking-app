import Note from "../models/note.model.js"
import { sendError, sendSuccess } from "../utils/response.js"

const getAllNotes = async (req, res) => {
  const userId = req.user.id

  try {
    const notes = (await Note.find({ author: userId })) || []
    return sendSuccess(res, "Notes fetched", 200, {
      status: "success",
      notes,
    })
  } catch (error) {
    return sendError(res, "Server Error", 500, {
      status: "failure",
    })
  }
}

const createNote = async (req, res) => {
  try {
    let tags = []
    if (req.body.tags) {
      tags = JSON.parse(req.body.tags)
      tags = [...new Set(tags.map((tag) => tag.trim().toLowerCase()))]
    }

    const createdNote = await Note.create({
      title: req.body.title,
      content: req.body.content,
      pinned: req.body.pinned,
      tags,
      color: req.body.color || "#fff",
      author: req.user._id,
    })

    return sendSuccess(res, "Note Created Successfully", 201, {
      status: "success",
      createdNote,
    })
  } catch (error) {
    return sendError(res, "Internal Server Error", 500, {
      status: "failure",
    })
  }
}

const deleteNote = async (req, res) => {
  const noteId = req.params.id
  const userId = req.user?._id

  if (!noteId) {
    return sendError(res, "Note Id is missing", 400, {
      status: "failure",
    })
  }

  console.log("deleteNote::userId", userId)

  try {
    const note = await Note.findById(noteId)

    if (!note) return sendError(res, "Note not found", 404)

    await Note.findByIdAndDelete(noteId)

    return sendError(res, "Note deleted", 200, {
      status: "success",
    })
  } catch (error) {
    console.log("deleteNote Error :: ", error)
    return sendError(res, "Server Error", 500, {
      status: "failure",
    })
  }
}

const updateNote = async (req, res) => {
  const noteId = req.params.id
  if (!noteId) {
    return sendError(res, "Note Id is missing", 400, {
      status: "failure",
    })
  }
  try {
    const note = await Note.findById(noteId)
    if (!note) {
      return sendError(res, "Not not found", 404, {
        status: "failure",
      })
    }

    if (req.body.title) {
      note.title = req.body.title
    }

    if (req.body.content) {
      note.content = req.body.content
    }

    let tags = []
    if (req.body.tags) {
      tags = JSON.parse(req.body.tags)
      tags = [...new Set(tags.map((tag) => tag.trim().toLowerCase()))]
    }
    note.tags = tags

    if (req.body.pinned) {
      note.pinned = req.body.pinned
    }

    if (req.body.color) {
      note.color = req.body.color
    }

    const updatedNote = await note.save()

    return sendSuccess(res, "Note updated Successfully", 201, {
      status: "success",
      updatedNote,
    })
  } catch (error) {
    console.log("updateNote Error :: ", error)
    return sendError(res, "Server Error", 500, {
      status: "failure",
    })
  }
}

export { createNote, deleteNote, getAllNotes, updateNote }
