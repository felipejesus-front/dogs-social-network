import React, { createContext, useCallback, useEffect, useState } from "react";
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from "./Api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export function UserStorage({ children }) {
	const [data, setData] = useState(null);
	const [login, setLogin] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const userLogOut = useCallback(
		async function () {
			setData(null);
			setError(null);
			setLoading(false);
			setLogin(false);
			window.localStorage.removeItem("token");
			navigate("/dogs-social-network/login");
		},
		[navigate]
	);

	async function getUser(token) {
		const { url, options } = USER_GET(token);
		const response = await fetch(url, options);
		const json = await response.json();
		setData(json);
		setLogin(true);
	}

	async function userLogin(username, password) {
		try {
			setError(null);
			setLoading(true);
			const { url, options } = TOKEN_POST({ username, password });
			const tokenRes = await fetch(url, options);

			if (!tokenRes.ok)
				throw new Error(`Erro: Usuário e senha inválidos.`);

			const { token } = await tokenRes.json();
			window.localStorage.setItem("token", token);
			await getUser(token);
			navigate("/dogs-social-network/conta");
		} catch (err) {
			setError(err.message);
			setLogin(false);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		async function autoLogin() {
			const token = window.localStorage.getItem("token");
			if (token) {
				try {
					setError(null);
					setLoading(true);

					const { url, options } = TOKEN_VALIDATE_POST(token);
					const response = await fetch(url, options);

					if (!response.ok) throw new Error("token inválido");

					await getUser(token);
				} catch (err) {
					userLogOut();
				} finally {
					setLoading(false);
				}
			} else {
				setLogin(false);
			}
		}
		autoLogin();
	}, [userLogOut]);

	return (
		<UserContext.Provider
			value={{ userLogin, data, userLogOut, error, loading, login }}
		>
			{children}
		</UserContext.Provider>
	);
}
