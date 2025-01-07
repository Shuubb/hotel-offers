import jwtValidation from './middleware/jwtValidation';
import addPost from './posts/addPost';
import getPosts from './posts/getPosts';

import { AutoRouter, cors } from 'itty-router';

const { preflight, corsify } = cors();

const router = AutoRouter({
	before: [preflight],
	finally: [corsify],
});

router
	.post('/api/getPosts', getPosts)
	.post('/api/addPost', jwtValidation, addPost)
	.all('*', () => new Response('Not Found', { status: 404 }));
//fix
export default {
	fetch: router.fetch,
};
