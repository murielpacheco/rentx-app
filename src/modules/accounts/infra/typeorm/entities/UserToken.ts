import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

import { v4 as uuidV4 } from "uuid";

@Entity("users_token")
class UsersToken {
   @PrimaryColumn()
   	id: string;

   @Column()
   	refresh_token: string;

   @Column()
   	user_id: string;
   
   @ManyToOne(() => User)
   @JoinColumn({ name: "user_id" })
   	user: User;
   
   @Column()
   	expires_at: Date;

   @CreateDateColumn()
   	created_at: Date;

   constructor() {
   	if (!this.id) {
   		this.id = uuidV4();
   	}
   }
}

export { UsersToken };