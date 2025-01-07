export default async function (collection, data, env) {
    try {
        const res = await fetch(`${env.MONGO_DB_URL}/action/insertOne`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": env.MONGO_DB_API_KEY,
            },
            body: JSON.stringify({
                collection,
                database: env.MONGO_DB_DATABASE_NAME,
                dataSource: env.MONGO_DB_CLUSTER_NAME,
                document: data,
            }),
        });

        if (!res.ok) {
            const errorResponse = await res.text();
            throw new Error(`Failed to insert document: ${errorResponse}`);
        }

        return await res.json();
    } catch (error) {
        console.error("insertOne error:", error);
        throw error;
    }
}
