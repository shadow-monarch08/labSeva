import { createContext, useContext, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
<<<<<<< HEAD
    const [user, setUser] = useState({});
    const [isSendingFile, setIsSendingFile] = useState(false)
    const [formData, setFormData] = useState([])
    const [userCart, setUserCart] = useState([])
=======
    const [user, setUser] = useState({
        username : '',
        useremail : ''
    });
    const [isSendingFile, setIsSendingFile] = useState(false)
    const [formData, setFormData] = useState([])
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
    const [completeUserReportOverview, setCompleteUserReportOverview] = useState({})
    const [showToast, setShowToast] = useState({})
    const [userScores, setUserScores] = useState([])

    const [toastBody, setToastBody] = useState({
        error: {},
        success: {}
    })

    return (
        <GlobalContext.Provider value={{
            user,
            setUser,
            showToast,
            setShowToast,
            toastBody,
            setToastBody,isSendingFile, 
            setIsSendingFile,
            formData, 
            setFormData,
            completeUserReportOverview, 
            setCompleteUserReportOverview,
            userScores, 
<<<<<<< HEAD
            setUserScores,
            userCart, 
            setUserCart
=======
            setUserScores
>>>>>>> d793f951326096cdb28314716fb9557a3606c751
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook to use Global Context
export const UseGlobalContext = () => {
    return useContext(GlobalContext);
};
