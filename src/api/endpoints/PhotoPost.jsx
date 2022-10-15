import React, { useState } from "react";

function PhotoPost() {
	const [token, setToken] = useState("");
	const [nome, setNome] = useState("");
	const [peso, setPeso] = useState("");
	const [idade, setIdade] = useState("");
	const [img, setImg] = useState("");

	function handleSubmit(event) {
		event.preventDefault();

		const formData = new FormData();
		formData.append("img", img);
		formData.append("peso", peso);
		formData.append("nome", nome);
		formData.append("idade", idade);

		fetch("https://dogsapi.origamid.dev/json/api/photo", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + token,
			},
			body: formData,
		}).then((response) => {
			console.log(response);
			return response.json().then((json) => {
				console.log(json);
				return json;
			});
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				value={token}
				onChange={({ target }) => setToken(target.value)}
				placeholder="Token"
			/>
			<input
				type="text"
				value={nome}
				onChange={({ target }) => setNome(target.value)}
				placeholder="Nome"
			/>
			<input
				type="text"
				value={peso}
				onChange={({ target }) => setPeso(target.value)}
				placeholder="Peso"
			/>
			<input
				type="text"
				value={idade}
				onChange={({ target }) => setIdade(target.value)}
				placeholder="Idade"
			/>
			<input
				type="file"
				onChange={({ target }) => setImg(target.files[0])}
			/>

			<button>Enviar</button>
		</form>
	);
}

export default PhotoPost;
