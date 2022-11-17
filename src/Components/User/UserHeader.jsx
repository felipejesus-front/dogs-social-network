import React from "react";
import UserHeaderNav from "./UserHeaderNav";
import styles from "./UserHeader.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function UserHeader() {
	const [title, setTitle] = useState("");

	const location = useLocation();

	useEffect(() => {
		const { pathname } = location;

		switch (pathname) {
			case "/dogs-social-network/conta/estatisticas":
				setTitle("Estatísticas");
				break;

			case "/dogs-social-network/conta/postar":
				setTitle("Poste Sua Foto");
				break;

			default:
				setTitle("Minha Conta");
		}
	}, [location]);

	return (
		<header className={styles.header}>
			<h1 className="title">{title}</h1>
			<UserHeaderNav />
		</header>
	);
}

export default UserHeader;
