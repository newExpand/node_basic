import { Controller, Get } from "@nestjs/common";

@Controller()
export class HelloController {
    @Get()
    hello() {
        return "안녕하세요! Nestjs로 만든 첫 어플리케이션입니다.";
    }
}
