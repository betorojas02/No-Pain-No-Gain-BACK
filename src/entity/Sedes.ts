
import {Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Cuidad} from './Cuidad';

@Entity()
export class Sede {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombreSede: string;


    @ManyToOne(() => Cuidad, ciudad => ciudad.sede)
    cuidad: Cuidad;



    @Column()
    @CreateDateColumn({select: false})
    createdAt:Date;

    @Column()
    @UpdateDateColumn({select: false})
    updateAt:Date;
}