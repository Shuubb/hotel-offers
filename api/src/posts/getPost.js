import findOne from '../database/findOne';
import { ObjectId } from 'mongodb'; // If you're using the MongoDB Node.js driver

export default async function (request, env) {
	try {
		const id = new ObjectId(request.id);

		const result = await findOne('posts', { postId: id }, env);
		return new Response(JSON.stringify(result.document), { status: 200 });
	} catch (error) {
		console.error('Error retrieving posts:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
