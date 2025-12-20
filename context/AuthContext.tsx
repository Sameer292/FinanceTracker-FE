import React, { createContext, useContext, useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import apiClient from "app/lib/api"
import { isAxiosError } from "axios"
import { useRouter } from "expo-router"
import { toast } from "sonner-native"

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

const AuthContext = createContext<{
    authStatus: AuthStatus
    setAuthStatus: React.Dispatch<React.SetStateAction<AuthStatus>>
    user: User | undefined
    setUser: React.Dispatch<React.SetStateAction<User | undefined>>
    login: (data: LoginInput) => void
    logout: () => void
    register: (data:RegisterInput) => void
}>({
    authStatus: "loading",
    setAuthStatus: () => { },
    user: undefined,
    setUser: () => { },
    login: (data:LoginInput) => { },
    logout: () => { },
    register: (data: RegisterInput) => { },
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [authStatus, setAuthStatus] = useState<AuthStatus>("loading")
    const [user, setUser] = useState<User>()
    const router = useRouter()

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

    const login = async (data:LoginInput) => {
         try {
            console.log("Trying to log in")
      const res = await apiClient.post('/login', data)
      if (res.status === 200 && res.data?.access_token) {
        await AsyncStorage.setItem('accessToken', res.data.access_token)
        await AsyncStorage.setItem('userId', String(res.data.id))
        const data = await apiClient.get<User>('/me')
        setAuthStatus("authenticated")
        setUser(data.data)
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Failed logging in', {
          duration: 2000,
          description: err.response?.data.detail || "Internam server error",
          richColors: true,
        })
      } else {
        toast.error('Failed logging in', {
          duration: 2000,
          description: 'Something went wrong',
          richColors: true,
        })
      }
    }
    }

    const register = async (data:RegisterInput) => {
        try {
      const res = await apiClient.post('/register', data)
      if (res.status === 200) {
        toast.success('Signup successful', {
          duration: 2000,
          description: res.data.message,
          richColors: true,
        })
        router.push('/login')
      }
    } catch (err) {
      if (isAxiosError(err)) {
        toast.error('Signup failed', {
          duration: 2000,
          description: err.response?.data.detail,
          richColors: true,
        })
      } else {
        toast.error('Signup failed', {
          duration: 2000,
          description: 'Something went wrong',
          richColors: true,
        })
      }
    }
    }

    const logout = async ()=>{
        await AsyncStorage.removeItem("accessToken")
        setAuthStatus("unauthenticated")
    }


    return (
        <AuthContext.Provider value={{ authStatus, setAuthStatus, setUser, user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
