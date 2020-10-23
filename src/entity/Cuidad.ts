import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

import {Sede} from '../entity/Sedes';
import {IsOptional} from 'class-validator';
import {Exclude} from 'class-transformer';

@Entity()
export class Cuidad {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()

    nombreCuidad: string;


    @OneToMany(type => Sede, sede => sede.cuidad) //
    sede: Sede[];


    @Column()
    @Column({ select: false })
    @CreateDateColumn( {select: false})
    createdAt:Date;

    @Column({ select: false })
    @UpdateDateColumn( {select: false})
    updateAt:Date;

}