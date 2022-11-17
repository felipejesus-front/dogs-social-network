import React from "react";
import { useNavigate } from "react-router-dom";
import { PHOTO_DELETE } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import styles from "./PhotoDelete.module.css";

function PhotoDelete({ id }) {
	const { loading, request } = useFetch();
	const navigate = useNavigate();

	async function handleClick() {
		const confirm = window.confirm(
			"Tem certeza que deseja deletar esta foto?"
		);
		if (confirm) {
			const { url, options } = PHOTO_DELETE(id);
			const { response } = await request(url, options);

			if (
				response.ok &&
				window.location.pathname === "/dogs-social-network"
			)
				window.location.reload();
			else navigate("/dogs-social-network/conta");
		}
	}

	return (
		<>
			{loading ? (
				<button
					disabled
					className={styles.delete}
					onClick={handleClick}
				>
					Deletando...
				</button>
			) : (
				<button className={styles.delete} onClick={handleClick}>
					Deletar
				</button>
			)}
		</>
	);
}

export default PhotoDelete;
