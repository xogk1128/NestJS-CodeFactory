import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';
import { ProfileModel } from './profile.entity';
import { PostModel } from './post.entity';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity()
export class UserModel {
  // ID
  // 자동으로 ID를 생성

  // @PrimaryGeneratedColumn()
  // Primary Column은 모든 테이블에서 기본적으로 존재해야 함.
  // 테이블 안에서 각각의 Row를 구분 할 수 있는 컬럼이다.
  // @PrimaryColumn
  //
  // @PrimaryGeneratedColumn('uuid')
  //
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  // type : 'text' , 'varchar'
  //   @Column({
  //     // 데이터베이스에서 인지하는 컬럼 타입
  //     // 자동으로 유추됨
  //     type: 'text',
  //     // 데이터베이스 칼럼 이름
  //     // 프로퍼티 이름으로 자동 유추됨
  //     name: 'title',
  //     // 값의 길이
  //     // 입력 할 수 있는 글자의 길이가 300
  //     length: 300,
  //     // null이 가능한지
  //     nullable: false,
  //     // true면 처음 지정할때만 값 지정ㅇ 가능
  //     // 이후에는 값 변경 불가능
  //     update: false,
  //     // find()를 실행할 때 기본으로 값을 불러올지
  //     // 기본값이 true
  //     select: false,
  //     // 기본 값
  //     // 아무것도 입력하지 않았을 경우 기본으로 입력되게 되는 값
  //     default: 'default value',
  //     // 칼럼 중에서 유일무이한 값이 돼야하는지
  //     unique: false,
  //   })
  //   title: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  // 데이터가 생성되는 날짜와 시간이 자동으로 찍힘.
  @CreateDateColumn()
  createdAt: Date;

  // 데이터가 업데이트되는 날짜와 시간이 자동으로 찍힘.
  @UpdateDateColumn()
  updatedAt: number;

  // 데이터가 업데이트 될때마다 1씩 올라간다.
  // 처음 생성되면 값은 1이다.
  // save() 함수가 몇번 불렸는지 기억한다.
  @VersionColumn()
  version: number;

  // increment는 @PrimaryGeneratedColumn()와 같이 1씩 올라가는데 프라이머리 컬럼은 아님
  @Column()
  @Generated('increment')
  additionalId: number;

  @OneToOne(() => ProfileModel, (profile) => profile.user, {
    // find() 실행 할 때마다 항상 같이 가져올 relation
    eager: true,

    // 저장할 때 relation을 한번에 같이 저장 가능
    cascade: true,

    // null이 가능한지
    nullable: true,

    // 관계가 삭제됐을 때
    // no action -> 아무것도 안함
    // cascade -> 참조하는 Row도 같이 삭제
    // set null -> 참조하는 Row에서 참조 id를 null로 변경
    // set defailt -> 기본 세팅으로 설정 (테이블의 기본 세팅)
    // restrict -> 참조하고 있는 Row가 있는 경우 참조 당하는 Row 삭제 불가
    onDelete: 'CASCADE',
  })
  profile: ProfileModel;

  @OneToMany(() => PostModel, (post) => post.author)
  posts: PostModel[];

  @Column({
    default: 0,
  })
  count: number;
}
