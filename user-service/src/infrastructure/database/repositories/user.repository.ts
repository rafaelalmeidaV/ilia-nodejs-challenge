import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../core/domain/repositories/user.repository.interface';
import { UserEntity } from '../../../core/domain/entities/user.entity';
import { User, UserDocument } from '../mongodb/schemas/user.schema';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const createdUser = new this.userModel({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      status: user.status,
    });

    const saved = await createdUser.save();
    return this.toDomain(saved);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const user = await this.userModel.findById(id).exec();
    return user ? this.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    return user ? this.toDomain(user) : null;
  }

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userModel.find().exec();
    return users.map((user) => this.toDomain(user));
  }

  async update(
    id: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity | null> {
    const user = await this.userModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return user ? this.toDomain(user) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    return !!result;
  }

  private toDomain(user: UserDocument): UserEntity {
    return new UserEntity({
      id: user._id.toString(),
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }
}
