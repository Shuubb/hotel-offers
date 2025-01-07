export default async function (collection, filter, sort, env) {
	try {
		const res = await fetch(`${env.MONGO_DB_URL}/action/find`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': env.MONGO_DB_API_KEY,
			},
			body: JSON.stringify({
				collection,
				database: env.MONGO_DB_DATABASE_NAME,
				dataSource: env.MONGO_DB_CLUSTER_NAME,
				filter,
				sort, // Add the sort parameter
			}),
		});

		if (!res.ok) {
			const errorResponse = await res.text();
			throw new Error(`Failed to find documents: ${errorResponse}`);
		}

		return await res.json();
	} catch (error) {
		console.error('find error:', error);
		throw error;
	}
}
