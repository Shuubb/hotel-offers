import insertOne from '../database/insertOne';

export default async function (request, env) {
	try {
		const user = request.user;

		if (user.role !== 'hotel') {
			return new Response(JSON.stringify({ message: 'Only Hotels Can Upload Posts' }), { status: 401 });
		}

		const data = await request.json();

		await insertOne('posts', { user: user.userId, views: 0, ...data }, env);

		return new Response(JSON.stringify({ message: 'Post Created Successfully' }), { status: 201 });
	} catch (error) {
		console.error('Error during posting:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
