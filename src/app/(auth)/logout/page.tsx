import { useEffect } from "react"
import { logout } from "../actions"

export default async function Logout() {
  await logout();
  return null
}