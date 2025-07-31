//src/socket.ts

import { Server as IOServer, Socket } from "socket.io";
import type { FastifyInstance } from "fastify";

export const setupSocketIO = (fastify: FastifyInstance, server: any) => {
	const io = new IOServer(server, {
		cors: {
			origin: 'http://localhost:5500',
			credentials: true
		}
	});

	io.use(async (socket: Socket, next: any) => {
		const token = socket.handshake.auth.token;
		
		if (!token) {
			return next(new Error('No token provided'));
		}

		try {
			const payload = await fastify.jwt.verify(token);
			socket.data.user = payload; // ALMACENAR EL USUARIO EN LA CONEXION
			next();
		} catch (err) {
			next(new Error('Invalid token'));
		}
	});

	// Se conecta un cliente
	io.on('connection', (socket: Socket) => {
		const user = socket.data.user;
		console.log('User connected:', user.display_name);
		
		socket.emit('Welcome', `Welcome ${user.display_name}`);

		socket.on('message', (msg: string) => {
			console.log(`[${user.display_name}] says: ${msg}`);
			// Sr envia a todos en mensaje
			io.emit('message', {
				from: user.display_name,
				text: msg,
			});
		});

		// Desconecta el usuario
		socket.on('disconnect', () => {
			console.log(`User: ${socket.data.user.display_name} disconnected`);
		});
	});

	return io;
}
