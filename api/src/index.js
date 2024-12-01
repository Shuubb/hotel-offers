export default {
	async fetch(request, env) {
		const { method, url } = request;

		// Handle CORS: Add headers to disable CORS restrictions
		const corsHeaders = {
			'Access-Control-Allow-Origin': '*', // Allow all origins
			'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS', // Allow specific methods
			'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Allow specific headers
		};

		if (method === 'OPTIONS') {
			return handleOptions(request, corsHeaders);
		}

		const endpointHandlers = {
			GET: () => listImages(request, env.R2_BUCKET, corsHeaders),
		};

		const key = `${method} ${new URL(url).pathname.split('/').pop()}`.trim();
		if (endpointHandlers[key]) {
			return endpointHandlers[key]();
		}

		return new Response(JSON.stringify({ error: 'Endpoint not found' }), {
			status: 404,
			headers: corsHeaders, // Add CORS headers to the 404 response
		});
	},
};

// Handle CORS preflight OPTIONS request
function handleOptions(request, corsHeaders) {
	return new Response(null, {
		status: 204,
		headers: corsHeaders, // Add CORS headers to OPTIONS response
	});
}

/// List all images from R2 bucket with detailed metadata
async function listImages(request, r2Bucket, corsHeaders) {
	try {
		const objects = [];
		let continuationToken = undefined;

		// Fetch all objects in the bucket using pagination
		do {
			const response = await r2Bucket.list({
				prefix: '',
				continuationToken,
			});

			objects.push(...response.objects);
			continuationToken = response.continuationToken;
		} while (continuationToken);

		// Fetch detailed metadata for each object
		const images = await Promise.all(
			objects.map(async (object) => {
				const objectData = await r2Bucket.get(object.key);
				let metadata = null;

				if (objectData) {
					const textData = await objectData.text(); // Assuming metadata is stored as JSON
					metadata = JSON.parse(textData);
				}

				return {
					id: object.key,
					size: object.size,
					lastModified: object.lastModified,
					etag: object.etag,
					metadata: metadata || {}, // Include metadata or empty object if unavailable
				};
			})
		);

		return new Response(JSON.stringify({ images }), {
			status: 200,
			headers: {
				...corsHeaders,
				'Content-Type': 'application/json',
			},
		});
	} catch (error) {
		console.error('Error listing images:', error);
		return errorResponse('Failed to retrieve image details', corsHeaders);
	}
}

function errorResponse(message, corsHeaders) {
	return new Response(JSON.stringify({ error: message }), {
		status: 500,
		headers: corsHeaders,
	});
}
