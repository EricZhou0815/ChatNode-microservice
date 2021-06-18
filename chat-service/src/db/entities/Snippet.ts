import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("snippets")
export default class Snippet {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  creator: string

  @Column()
  content: string

  @CreateDateColumn()
  createdAt: string

  @OneToMany(type => Ledger, ledger => ledger.user)
  ledgers: Ledger[];

  constructor(content: string, creator: string) {
    this.username = username
    this.password = password
  }
}