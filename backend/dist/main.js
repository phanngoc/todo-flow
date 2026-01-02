"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const net = require("net");
const constants_1 = require("./common/constants");
async function findFreePort(startPort) {
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        server.listen(startPort, () => {
            const port = server.address().port;
            server.close(() => resolve(port));
        });
        server.on('error', (err) => {
            if (err.code === constants_1.NETWORK_ERROR_CODES.EADDRINUSE) {
                resolve(findFreePort(startPort + 1));
            }
            else {
                reject(err);
            }
        });
    });
}
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        credentials: true,
    });
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
//# sourceMappingURL=main.js.map