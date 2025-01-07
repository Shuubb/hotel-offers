import jwtValidation from './middleware/jwtValidation';
import getPosts from './posts/getPosts';

import { AutoRouter, cors } from 'itty-router';

const { preflight, corsify } = cors();

const router = AutoRouter({
	before: [preflight],
	finally: [corsify],
});

router
	.get('/getPosts', getPosts)
	.post('/addPost', jwtValidation)
	.all('*', () => new Response('Not Found', { status: 404 }));

export default {
	fetch: router.fetch,
};
