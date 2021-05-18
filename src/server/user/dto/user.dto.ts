// 详细文档：https://github.com/typestack/class-validator
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class CreateUserDTO {
  @IsNotEmpty({ message: '用户ID不能为空' })
  @IsInt({ message: '用户姓名必须是 Number 类型' })
  readonly _id: number;

  @IsNotEmpty({ message: '用户名不能为空' })
  @IsString({ message: '用户名必须是 String 类型' })
  readonly user_name: string;

  @IsNotEmpty({ message: '密码不能为空' })
  @IsString({ message: '密码必须是 String 类型' })
  readonly password: string;
}

export class EditUserDTO {
  @IsOptional() // 声明可选参数
  @IsString({ message: '用户名必须是 String 类型' })
  readonly user_name: string;

  @IsOptional() // 声明可选参数
  @IsString({ message: '密码必须是 String 类型' })
  readonly password?: string;
}
