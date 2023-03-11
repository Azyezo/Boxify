import { Navigate, Outlet } from "react-router-dom"
import { useGlobalState } from "../store"

const PrivateRoute = () => {

    const [isLoggedIn] = useGlobalState('isLoggedIn')

    return isLoggedIn ? <Outlet /> : <Navigate to="signin" />

}

export default PrivateRoute;