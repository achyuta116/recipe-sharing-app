import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => { 
    const [error, setError] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (username: string, password: string) => {
        setError(null)
        const res  = await fetch('api/auth/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: new Headers({
                'content-type': 'application/json'
            })        
        })
        const data = await res.json()
        if (!res.ok) {
            console.log(data.error)
            setError(data.error)
        } else {
            localStorage.setItem('user', JSON.stringify(data))
            dispatch({type: 'LOGIN', payload: data})
        }
    }

    return { login, error }
}
export {}
