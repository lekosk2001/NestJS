import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './auth.entity';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async signUp({ username, password }: AuthCredentialDto): Promise<User> {
        const user = this.userRepository.create({
            username,
            password,
        });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('있는 유저네임');
            } else {
                throw new InternalServerErrorException();
            }
        }

        return user;
    }
}
