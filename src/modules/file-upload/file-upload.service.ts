import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";
import { FileUpLoadRepository } from "./file.upload.repository";
import { Readable } from "stream";

@Injectable()
export class FileUploadService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly fileUpLoadRepository: FileUpLoadRepository
  ) {}

  async uploadImageStream(file: Readable, userId: string) {
    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException("Usuario no fue encontrado");
    }

    const uploadResponse = await this.fileUpLoadRepository.uploadImageStream(
      file
    );

    await this.usersRepository.update(user.id, {
      Image_Profile: uploadResponse.url,
    });

    return await this.usersRepository.findOneBy({ id: userId });
  }
}
