import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDTO, EditUserDTO } from './dto/user.dto';
import { User } from './interface/user.interface';

@Injectable()
export class UserService {
  // Once you've registered the schema, you can inject a model into the Service using the @InjectModel() decorator
  constructor(@InjectModel('Users') private readonly userModel: Model<User>) {}

  // 查找所有用户
  async findAll(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  // 查找单个用户
  async findOne(_id: string): Promise<User> {
    return await this.userModel.findById(_id);
  }

  // 添加单个用户
  async addOne(body: CreateUserDTO): Promise<void> {
    await this.userModel.create(body);
  }

  // 编辑单个用户
  async editOne(_id: string, body: EditUserDTO): Promise<void> {
    await this.userModel.findByIdAndUpdate(_id, body);
  }

  // 删除单个用户
  async deleteOne(_id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(_id);
  }
}
