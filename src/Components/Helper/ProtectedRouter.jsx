import React from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function ProtectedRouter({ children }) {
	const { login } = useContext(UserContext);

	return login ? children : <Navigate to="/dogs-social-network/login" />;
}

export default ProtectedRouter;
