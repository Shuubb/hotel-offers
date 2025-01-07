import jwtValidation from './middleware/jwtValidation';
import getPosts from './posts/getPosts';

import { AutoRouter, cors } from 'itty-router';

const { preflight, corsify } = cors();

const router = AutoRouter({
	before: [preflight],
	finally: [corsify],
});

router
	.get('/api/getPosts', getPosts)
	.post('/api/addPost', jwtValidation)
	.all('*', () => new Response('Not Found', { status: 404 }));
//fix
export default {
	fetch: router.fetch,
};
