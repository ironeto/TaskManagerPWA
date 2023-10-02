import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { verifyLogin } from "../utils/auth";

const NotFound = ({ setCurrentPath, loggoutRoutes, firebaseApp }) => {
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentPath(window.location.pathname)
        verifyLogin(loggoutRoutes, window.location.pathname, navigate, firebaseApp)
    }, [])

    return 'Página não encontrada'
}

export default NotFound