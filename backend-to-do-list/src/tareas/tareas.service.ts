import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';
import { Tarea } from './entities/tarea.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { TareasGateway } from './tareas.gateway';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea) private readonly tareaRepository: Repository<Tarea>,
    private readonly tareasGateway: TareasGateway
  ) { }
  async create(createTareaDto: CreateTareaDto, user: UserActiveInterface) {
    const nuevaTarea = await this.tareaRepository.save({
      ...createTareaDto,
      userEmail: user.email,
    });
    this.tareasGateway.emitirNuevaTarea(nuevaTarea);
    return nuevaTarea;
  }

  async findAll(user: UserActiveInterface) {
    const allTareas = await this.tareaRepository.find();
    if (!allTareas) {
      throw new BadRequestException('No hay tareas registradas');
    }

    return allTareas;
  }

  async findOne(id: number, user: UserActiveInterface) {
    const tarea = await this.tareaRepository.findOne({ where: { id } })
    if (!tarea) {
      throw new BadRequestException(`Tarea con id ${id} no existe`);
    }
    return tarea;
  }

  async update(id: number, updateTareaDto: UpdateTareaDto, user: UserActiveInterface) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    if (!tarea) {
      throw new BadRequestException(`Tarea con id ${id} no existe`);
    }
    Object.assign(tarea, updateTareaDto);
    const tareaActualizada = await this.tareaRepository.save(tarea);

    this.tareasGateway.emitirTareaActualizada(tareaActualizada);
    return { message: 'Tarea actualizada correctamente' }
  }
  async remove(id: number, user: UserActiveInterface) {
    const tarea = await this.tareaRepository.findOne({ where: { id } });
    if (!tarea) {
      throw new BadRequestException(`Tarea con id ${id} no existe`);
    }
    this.tareasGateway.emitirTareaEliminada(id);
    return { message: 'Tarea eliminada correctamente' };
  }
}
