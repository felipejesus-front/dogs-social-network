import React from "react";
import { useEffect } from "react";
import { GET_STATS } from "../../Api";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import UserStatsGraphs from "./UserStatsGraphs";

function UserStats() {
	const { data, error, loading, request } = useFetch();

	useEffect(() => {
		async function getData() {
			const { url, options } = GET_STATS();
			await request(url, options);
		}
		getData();
	}, [request]);

	if (error) <Error error={error} />;
	if (loading) <Loading />;
	if (data)
		return (
			<div>
				<Head title="Estatísticas" />
				<UserStatsGraphs data={data} />
			</div>
		);
	else return null;
}

export default UserStats;
