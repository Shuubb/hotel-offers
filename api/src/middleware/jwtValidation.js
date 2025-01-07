import jwt from 'jsonwebtoken';

// JWT validation middleware function
export default async function (request, env) {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader) {
		return new Response('Authorization header missing');
	}

	const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

	try {
		const decoded = jwt.verify(token, env.JWT_SECRET); // Verify token
		request.user = decoded; // Attach decoded user data to request object
	} catch (err) {
		return new Response('Invalid or expired token');
	}
}
