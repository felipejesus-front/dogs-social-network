import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import PropTypes from "prop-types";

function Feed({ user }) {
	const [modalPhoto, setModalPhoto] = useState(null);
	const [pages, setPages] = useState([1]);
	const [infinite, setInfinite] = useState(true);

	useEffect(() => {
		let wait = false;

		function infinitScroll() {
			if (infinite === true) {
				const scroll = window.scrollY;
				const height = document.body.offsetHeight - window.innerHeight;

				if (scroll > height * 0.75 && !wait) {
					setPages((pages) => [...pages, pages.length + 1]);
					wait = true;

					setTimeout(() => {
						wait = false;
					}, 500);
				}
			}
		}
		//

		window.addEventListener("wheel", infinitScroll);
		window.addEventListener("scroll", infinitScroll);

		return () => {
			window.removeEventListener("wheel", infinitScroll);
			window.removeEventListener("scroll", infinitScroll);
		};
	}, [infinite]);

	return (
		<div>
			{modalPhoto && (
				<FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
			)}
			{pages.map((page) => (
				<FeedPhotos
					key={page}
					user={user}
					page={page}
					setModalPhoto={setModalPhoto}
					setInfinite={setInfinite}
				/>
			))}
			{!infinite && (
				<p style={{ textAlign: "center", color: "#333" }}>
					não existem mais postagens.
				</p>
			)}
		</div>
	);
}

Feed.defaultProps = {
	user: 0,
};

Feed.propTypes = {
	user: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.number.isRequired,
	]),
};

export default Feed;
