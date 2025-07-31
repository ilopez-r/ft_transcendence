//src/routes/userRoutes.ts

import { FastifyInstance } from "fastify";
import { loginUser, registerUser, logoutUser, toggle2FA } from '../controllers/userController'
import { verify2FA } from "../2fa/utils";
import { verifyToken } from "../middlewares/auth";

export async function userRoutes(fastify: FastifyInstance) {
	fastify.post('/register', registerUser);
	fastify.post('/login', loginUser);
	fastify.post('/logout', logoutUser);
	fastify.post('/verify-2fa', verify2FA);
	fastify.patch('/2fa/toggle', { preHandler: verifyToken }, toggle2FA);

	fastify.get('/me', { preHandler: verifyToken }, async (request, reply) => {
		const user = request.user as any;
		return reply.send({
			message: 'Authenticated user',
			user: {
				user_id: user.user_id,
				display_name: user.display_name
			},
			token: request.cookies.token
		});
	});
}
