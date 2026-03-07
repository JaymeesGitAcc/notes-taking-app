import { loginUser } from "@/services/auth.api"
import type { AuthContextTypes, User } from "@/types/auth.types"
import React, { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext<AuthContextTypes | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)

  const navigate = useNavigate()

  const login = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password)
      const { token, user: loggedInUser } = res.data.data
      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      navigate("/")
    } catch (error: any) {
      console.error(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setUser(null)
    navigate("/")
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
