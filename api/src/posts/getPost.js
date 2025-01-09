import findOne from '../database/findOne';

export default async function (request, env) {
	try {
		const result = await findOne('posts', { postId: request.id }, env);
		return new Response(JSON.stringify(result.document), { status: 200 });
	} catch (error) {
		console.error('Error retrieving posts:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
