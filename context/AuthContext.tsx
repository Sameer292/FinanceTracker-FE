import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import apiClient from "app/lib/api"

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

const AuthContext = createContext<{
    authStatus: AuthStatus
    setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatus>>
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}>({
    authStatus: "loading",
    setAuthStatus: () => { },
    user: undefined,
    setUser: () => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading")
    const [user, setUser] = useState<User>()

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("accessToken")
            if (!token) {
                setAuthStatus("unauthenticated")
                return
            }

            try {
                const data = await apiClient.get("/me", {
                    headers: { Authorization: `Bearer ${token}` },
                })
                setAuthStatus("authenticated")
                setUser(data.data)
            } catch {
                await AsyncStorage.removeItem("accessToken")
                setAuthStatus("unauthenticated")
            }
        }

        checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus, setUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
