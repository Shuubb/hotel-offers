import findMultiple from '../database/findMultiple';

export default async function (request, env) {
	try {
		// Await the result from the findMultiple function
		const result = await findMultiple('posts', {}, { views: -1 }, env);

		return new Response(JSON.stringify(result.documents), { status: 200 });
	} catch (error) {
		console.error('Error retrieving posts:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
