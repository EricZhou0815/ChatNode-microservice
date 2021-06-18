import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity("tagandsnippets")
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
}