import { useEffect, useState } from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import UseForm from "../../Hooks/UseForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../Api";
import Error from "../Helper/Error";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

function LoginPasswordReset() {
	const [login, setLogin] = useState("");
	const [key, setKey] = useState("");
	const password = UseForm();
	const { error, loading, request } = useFetch();
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const key = params.get("key");
		const login = params.get("login");

		if (key) setKey(key);
		if (login) setLogin(login);
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		if (password.validate) {
			const { url, options } = PASSWORD_RESET({ login, key, password });

			const { response } = await request(url, options);

			if (response.ok) navigate("/login");
		}
	}

	return (
		<section className="animeLeft">
			<Head title="Resete a Senha?" />

			<h1 className="title">Resete a Senha</h1>
			<form onSubmit={handleSubmit}>
				<Input
					label="Nova Senha"
					type="password"
					name="password"
					{...password}
				/>
				{loading ? (
					<Button disabled>Resetando...</Button>
				) : (
					<Button>Resetar Senha</Button>
				)}
			</form>
			<Error error={error} />
		</section>
	);
}

export default LoginPasswordReset;
