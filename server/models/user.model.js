import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

userSchema.pre("save", async function() {
    if(!this.modified("password")) return
    const salt = await bcrypt.genSalt(10)
    this.password = bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPasswords = async function(password) {
    return await bcrypt.compare(this.password, password)
}

const User = mongoose.model("User", userSchema)

export default User
