import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @Post('login')
    async login(@Body() loginFields: LoginDto) {
        return this.authService.login(loginFields);
    }
    
    @Post('register')
    async register(@Body() registerFields: CreateUserDto) {
        return this.authService.register(registerFields);
    }


    @UseGuards(AuthGuard)
    @Get('test')
    async test() {
        return 'Hello World!';
    }
}
