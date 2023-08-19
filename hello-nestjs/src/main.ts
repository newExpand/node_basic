import { NestFactory } from "@nestjs/core";
import { HelloModule } from "./hello.module";

async function bootstrap() {
    const app = await NestFactory.create(HelloModule);

    await app.listen(8080, () => console.log("서버시작: 포트 8080"));
}

bootstrap();
