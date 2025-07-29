import { Controller, Param, Post, Req, Res, HttpStatus } from "@nestjs/common";
import { Request, Response } from "express";
import { FileUploadService } from "./file-upload.service";
import * as Busboy from "busboy";
import { ApiTags, ApiOperation, ApiConsumes, ApiParam } from "@nestjs/swagger";

@ApiTags("File Upload")
@Controller("files")
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post("/uploadImage/:id")
  @ApiOperation({ summary: "Subir imagen de perfil sin Multer" })
  @ApiConsumes("multipart/form-data")
  @ApiParam({ name: "id", type: String, description: "ID del usuario" })
  async uploadImageWithoutMulter(
    @Param("id") id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    const busboy = Busboy({ headers: req.headers });
    let uploadPromise: Promise<any>;

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      console.log("Tipo MIME recibido:", mimetype);
      // Validar tipo de archivo
      if (/^image\/(jpeg|jpg|png|bmp|webp|svg\+xml)$/.test(mimetype)) {
        file.resume(); // descartar archivo
        res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: "Tipo de archivo no válido" });
        return;
      }

      uploadPromise = this.fileUploadService.uploadImageStream(file, id);
    });

    busboy.on("finish", async () => {
      try {
        const result = await uploadPromise;
        res.status(HttpStatus.OK).json(result);
      } catch (error) {
        res
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
    });

    req.pipe(busboy);
  }
}
