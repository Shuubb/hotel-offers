export default async function (collection, filter, env) {
    try {
        const res = await fetch(`${env.MONGO_DB_URL}/action/findOne`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": env.MONGO_DB_API_KEY,
            },
            body: JSON.stringify({
                collection,
                database: env.MONGO_DB_DATABASE_NAME,
                dataSource: env.MONGO_DB_CLUSTER_NAME,
                filter,
            }),
        });

        if (!res.ok) {
            const errorResponse = await res.text();
            throw new Error(`Failed to find document: ${errorResponse}`);
        }

        return await res.json();
    } catch (error) {
        console.error("findOne error:", error);
        throw error;
    }
}
