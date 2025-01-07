import findMultiple from '../database/findMultiple';

export default async function (request, env) {
	try {
		const filter = Object.fromEntries(
			[]
				.concat(request.query.filter)
				.map((v) => v?.split(':'))
				.filter(Boolean)
		);
		const sort = Object.fromEntries(
			[]
				.concat(request.query.sort)
				.map((v) => v?.split(':').map((x, i) => (i ? Number(x) : x)))
				.filter(Boolean)
		);
		const limit = request.query.limit ? request.query.limit : 10;

		const result = await findMultiple('posts', filter, sort, limit, env);

		return new Response(JSON.stringify(result.documents), { status: 200 });
	} catch (error) {
		console.error('Error retrieving posts:', error);
		return new Response(JSON.stringify({ message: 'Internal Server Error', error: error.message }), {
			status: 500,
		});
	}
}
