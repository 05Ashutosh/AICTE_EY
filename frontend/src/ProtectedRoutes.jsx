import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useSelector} from "react-redux";

export const ProtectedRoutes = ({children}) => {
    const isAuthenticated= useSelector(state =>state.auth?.isAuthenticated);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    },[isAuthenticated, navigate])
    return (
        children
    )
}
