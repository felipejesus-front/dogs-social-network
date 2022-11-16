import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UseForm from "../../Hooks/UseForm";
import { UserContext } from "../../UserContext";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import styles from "./LoginForm.module.css";
import stylesbtn from "../Forms/Button.module.css";

function LoginForm() {
	const username = UseForm();
	const password = UseForm();

	const { userLogin, error, loading } = useContext(UserContext);

	async function handleSubmit(event) {
		event.preventDefault();
		if (username.validate() && password.validate()) {
			userLogin(username.value, password.value);
		}
	}
	return (
		<section className="animeLeft">
			<h1 className="title">Login</h1>
			<form onSubmit={handleSubmit} className={styles.form}>
				<Input
					label="Usuário"
					type="text"
					name="username"
					{...username}
				/>
				<Input
					label="Senha"
					type="password"
					name="password"
					{...password}
				/>
				{loading ? (
					<Button disabled> Carregando...</Button>
				) : (
					<Button>Entrar</Button>
				)}
				<Error error={error} />
			</form>
			<Link className={styles.perdeu} to="/login/perdeu">
				Perdeu a senha?
			</Link>
			<div className={styles.cadastro}>
				<h2 className={styles.subtitle}>Cadastre-se</h2>
				<p>Ainda não possui conta? Cadastre-se no site.</p>
				<Link className={stylesbtn.button} to="/login/criar">
					Cadastro
				</Link>
			</div>
		</section>
	);
}

export default LoginForm;
