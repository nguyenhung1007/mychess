import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { UserRole } from './user.userRole.enum';

@Entity()
export class User {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column({ default: null })
      username: string;

      @Column({ default: null })
      password: string;

      @Column({ nullable: false })
      name: string;

      @Column({ default: '' })
      avatarUrl: string;

      @Column({ default: null, unique: true })
      googleId: string;

      @Column({ default: null, unique: true })
      facebookId: string;

      @Column({ default: null, unique: true })
      githubId: string;

      @Column({ default: 0 })
      elo: number;

      @Column({ default: new Date().toISOString().slice(0, 19).replace('T', ' ') })
      createDate: Date;

      @Column({ default: UserRole.USER.toString() })
      role: UserRole;

      @Column({ default: false })
      isDisabled: boolean;

      @Column({ default: null })
      email: string;

      @Column({ default: null })
      phoneNumber: string;
}

export default User;
