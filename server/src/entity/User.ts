import {Column,Entity, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
      id: number

    @Column("varchar", {length: 100})
      name: string
}