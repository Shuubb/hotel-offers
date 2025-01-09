import insertOne from '../database/insertOne';

export default async function (request, env) {
	try {
		const user = request.user;

		// Check if the user has the role 'hotel'
		if (user.role !== 'hotel') {
			return new Response(JSON.stringify({ message: 'Only Hotels Can Upload Posts' }), { status: 401 });
		}

		// Parse request data
		const data = await request.json();

		// Generate the postId by hashing the userId and timestamp
		const postId = await generatePostId(user.userId);

		// Insert the post into the database
		await insertOne(
			'posts',
			{
				user: user.userId,
				views: 0,
				...data,
				postId,
			},
			env
		);

		// Respond with success
		return new Response(JSON.stringify({ message: 'Post Created Successfully' }), { status: 201 });
	} catch (error) {
		console.error('Error during posting:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), { status: 500 });
	}
}

// Short helper function to generate postId
async function generatePostId(userId) {
	const uniqueString = `${userId}-${Date.now()}`;
	const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(uniqueString));
	return Array.from(new Uint8Array(hashBuffer))
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('')
		.substring(0, 24);
}
