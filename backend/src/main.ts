import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as net from 'net';
import { NETWORK_ERROR_CODES } from './common/constants';

async function findFreePort(startPort: number): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(startPort, () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(() => resolve(port));
    });
    server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === NETWORK_ERROR_CODES.EADDRINUSE) {
        resolve(findFreePort(startPort + 1));
      } else {
        reject(err);
      }
    });
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend
  app.enableCors({
    origin: true, // Allow all origins in development
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });

  // Global prefix for API routes
  app.setGlobalPrefix('api');

  const preferredPort = parseInt(process.env.PORT || '3005', 10);
  const port = await findFreePort(preferredPort);
  await app.listen(port);

  if (port !== preferredPort) {
    console.log(`⚠️  Port ${preferredPort} was in use, using port ${port} instead`);
  }
  console.log(`🚀 Todo API is running on: http://localhost:${port}/api`);
}
bootstrap();
