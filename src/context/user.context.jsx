import { createContext, useState,useEffect } from "react";
import { createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
import { onAuthStateChangeListener } from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
    currentUser:null,
    setCurrentUser: ()=> null,
})

export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() =>{
        const unsubscribe = onAuthStateChangeListener((user)=>{
            setCurrentUser(user);
            if(user) createUserDocumentFromAuth(user);
        })

        return unsubscribe
    },[])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}