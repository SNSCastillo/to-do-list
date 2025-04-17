import { Column, CreateDateColumn, Entity } from "typeorm";

@Entity()
export class Tarea {

    @Column({ primary: true, generated: true })
    id: number;

    @Column()
    nombre: string;

    @Column()
    descripcion: string;

    // La fecha de creación se obtiene automáticamente
    @CreateDateColumn({ type: 'timestamptz' })
    fechaCreacion: Date;

    @Column({ type: 'timestamptz' })
    fechaLimite: Date;

    @Column({ default: false })
    estado: boolean;
}
