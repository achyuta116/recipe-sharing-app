import { createContext, useReducer, useEffect } from 'react'


type AuthContextType = {
    dispatch: React.Dispatch<{
        type: string;
        payload?: {
            username: string,
            token: string
        } | null;
    }>
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const authReducer = (state: any, action: {type: string, payload: string}) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
        return state
    }
}

interface Props {
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined
}

export const AuthContextProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(authReducer, { 
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (user) {
        dispatch({ type: 'LOGIN', payload: user }) 
        }
    }, [])

    console.log('AuthContext state:', state)

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    )

}
