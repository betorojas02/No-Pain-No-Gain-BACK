import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany
} from 'typeorm';

import {MinLength, IsNotEmpty, IsOptional} from 'class-validator';

import *  as bcrypt  from 'bcryptjs';
import {Sede} from './Sedes';
import {UserToSede} from './UserToSede';

@Entity()
@Unique(['cedula'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    cedula:number;

    @Column()
    @MinLength(6)
    username:string;

    @Column()
    @MinLength(6)
    apellido:string;

    @Column()
    email:string;

    @Column()
    @MinLength(6)
    password:string;


    @OneToMany(type => UserToSede, userto => userto.user) //
    sede: UserToSede[];

    @IsOptional()
    @Column()
    @CreateDateColumn({select: false})
    createdAt:Date;

    @IsOptional()
    @Column()
    // @Exclude({ toPlainOnly: true })
    @UpdateDateColumn({select: false})
    updateAt:Date;

    hashPassword():void{
        const salt = bcrypt.genSaltSync(10);
        this.password = bcrypt.hashSync(this.password,salt);
    }

    checkPassword(password):boolean{
        return bcrypt.compareSync(password,this.password);
    }

}
