import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';  // Ajusta la ruta según tu archivo de entidad
import { Role } from 'src/common/enums/rol.enum';

@Injectable()
export class UserService implements OnModuleInit {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }

    async onModuleInit() {
        const userExists = await this.usuarioRepository.findOne({ where: { email: 'reto@blindariesgos.com' } });

        if (!userExists) {
            await this.usuarioRepository.save({
                role: Role.USER,
                name: 'Blindariesgos',
                email: 'reto@blindariesgos.com',
                password: 'Reto123',
            });
            console.log('Usuario de prueba insertado.');
        }
    }
}
