//src/middlewares/auth.ts

import { FastifyRequest, FastifyReply } from "fastify";
//import fastifyCookie from '@fastify/cookie';

export async function verifyCsrf(request: FastifyRequest, reply: FastifyReply): Promise<void> {
	const csrfCookie = request.cookies['csrf_token'];
	const csrfHeader = request.headers['x-csrf-token'];

	if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
		reply.status(403).send({ message: 'CSRF validation failed' });
	}
}

export const verifyToken = async (request: FastifyRequest, reply: FastifyReply) => {
	try {
		await request.jwtVerify();
	} catch (err) {
		reply.status(401).send({ error: 'Unauthorized' });
	}
};
