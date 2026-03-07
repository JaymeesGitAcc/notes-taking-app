import { api } from "@/lib/api"

export const loginUser = async (email: string, password: string) => {
  return await api.post("/api/auth/login", { email, password })
}
