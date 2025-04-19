import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';  // Adjust the path to your entity
import { Role } from 'src/common/enums/rol.enum';
import { ConfigService } from '@nestjs/config';  // You might need to inject ConfigService for config

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        const email = this.configService.get<string>('COREO');

        const userExists = await this.usuarioRepository.findOne({ where: { email } });

        if (!userExists) {
            await this.usuarioRepository.save({
                role: Role.USER,
                name: 'Blindariesgos',
                email: email,
                password: 'Reto123',
            });
            console.log('Usuario de prueba insertado.');
        }
    }
}
