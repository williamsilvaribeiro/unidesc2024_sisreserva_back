import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column({ unique: true })
    cpf: string;
}
