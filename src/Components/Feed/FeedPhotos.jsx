import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import { useEffect } from "react";
import { PHOTOS_GET } from "../../Api";
import Loading from "../Helper/Loading";
import styles from "./FeedPhotos.module.css";

function FeedPhotos({ page, user, setModalPhoto, setInfinite }) {
	const { data, loading, error, request } = useFetch();

	useEffect(() => {
		async function fetchPhotos() {
			const total = 3;
			const { url, options } = PHOTOS_GET({ page, total, user });
			const { response, json } = await request(url, options);
			if (response && response.ok && json.length < total) {
				setInfinite(false);
			}
			console.log(json);
		}
		fetchPhotos();
	}, [request, user, page, setInfinite]);

	if (error) return <Error error={error} />;
	if (loading) return <Loading />;
	if (data)
		return (
			<ul className={`${styles.feed} animeLeft`}>
				{data.map((photo) => (
					<FeedPhotosItem
						photo={photo}
						key={photo.id}
						setModalPhoto={setModalPhoto}
					/>
				))}
			</ul>
		);
	else return null;
}

export default FeedPhotos;