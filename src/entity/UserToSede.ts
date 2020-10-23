import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    ManyToOne
} from 'typeorm';

import {MinLength, IsNotEmpty} from 'class-validator';

import *  as bcrypt  from 'bcryptjs';
import {Sede} from './Sedes';
import {User} from './User';

@Entity()

export class UserToSede {

    @PrimaryGeneratedColumn()
    public id: number;


    @ManyToOne(() => User, user => user.id)
    public user!: User;

    @ManyToOne(() => Sede, sede => sede.id)
    public sede!: Sede;
}