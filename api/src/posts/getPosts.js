import findMultiple from '../database/findMultiple';

export default async function (request, env) {
	try {
		const { filter, sort, limit } = await request.json();

		const result = await findMultiple('posts', filter, sort, limit, env);

		return new Response(JSON.stringify(result.documents), { status: 200 });
	} catch (error) {
		console.error('Error retrieving posts:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
