import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipe/validation.pipe';
import { CreateUserDTO, EditUserDTO } from './dto/user.dto';
import { User, UserResponse } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET /user/users
  @Get('users')
  async findAll(): Promise<UserResponse<User[]>> {
    return {
      code: 200,
      data: await this.userService.findAll(),
      message: 'Success',
    };
  }

  // GET /user/:_id
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<UserResponse<User>> {
    return {
      code: 200,
      data: await this.userService.findOne(_id),
      message: 'Success.',
    };
  }

  // POST /user
  @Post()
  async addOne(@Body() body: CreateUserDTO): Promise<UserResponse> {
    await this.userService.addOne(body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  // PUT /user/:_id
  @UsePipes(new ValidationPipe()) // 使用管道验证
  @Put(':_id')
  async editOne(
    @Param('_id') _id: string,
    @Body() body: EditUserDTO,
  ): Promise<UserResponse> {
    await this.userService.editOne(_id, body);
    return {
      code: 200,
      message: 'Success.',
    };
  }

  // DELETE /user/:_id
  @Delete(':_id')
  async deleteOne(@Param('_id') _id: string): Promise<UserResponse> {
    await this.userService.deleteOne(_id);
    return {
      code: 200,
      message: 'Success.',
    };
  }
}
