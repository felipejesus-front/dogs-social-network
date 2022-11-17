import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { UserContext } from "../UserContext";

function Header() {
	const { data } = useContext(UserContext);

	return (
		<header className={styles.header}>
			<nav className={`${styles.nav} container`}>
				<Link
					className={styles.logo}
					to="/dogs-social-network"
					aria-label="Dogs - Home"
				>
					<Dogs />
				</Link>
				{data ? (
					<Link
						className={styles.login}
						to="dogs-social-network/conta"
					>
						{data.nome}
					</Link>
				) : (
					<Link
						className={styles.login}
						to="dogs-social-network/login"
					>
						Login / Criar
					</Link>
				)}
			</nav>
		</header>
	);
}

export default Header;
