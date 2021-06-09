import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createdAt: string

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }
}