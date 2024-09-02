import {
    Body,
    Controller,
    Get,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './auth.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    @UsePipes(ValidationPipe)
    createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<User> {
        return this.authService.signUp(authCredentialDto);
    }

    @Get('/')
    getAllUser(): Promise<User[]> {
        return this.authService.getAllUsers();
    }
}
