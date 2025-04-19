import { Logger } from '@nestjs/common';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';  // Ajusta la ruta según tu archivo de entidad
import { Role } from 'src/common/enums/rol.enum';
import { ConfigService } from '@nestjs/config';  // Asegúrate de que ConfigService esté importado correctamente
import * as bcrypt from 'bcryptjs';  // Importa bcryptjs para el hashing

@Injectable()
export class UserService implements OnModuleInit {
    private readonly logger = new Logger("Service Especial");
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly configService: ConfigService,
    ) { }

    async onModuleInit() {
        const email = this.configService.get('CORREO');
        const emailString = String(email);
        const userExists = await this.usuarioRepository.findOne({ where: { email: emailString } });

        if (!userExists) {
            const passwordHash = await bcrypt.hash('Reto123', 10);  // 10 es el "salt rounds" de bcrypt

            await this.usuarioRepository.save({
                role: Role.USER,
                name: String('Blindariesgos'),
                email: emailString,
                password: passwordHash,
            });
            this.logger.log(`Usuario inicial creado: ${emailString}`);
        }
    }
}
