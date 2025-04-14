// decorators/validate-file-field.decorator.ts
import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { FileValidator } from '@nestjs/common';

export type ValidatedAssets = Record<string, Express.Multer.File[]>;

export function UploadedAssets(validators: FileValidator[]) {
  return createParamDecorator(async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const files = request.files as Record<string, Express.Multer.File[]>;

    if (!files || Object.keys(files).length === 0) {
      throw new BadRequestException('No se encontraron archivos');
    }

    for (const key in files) {
      const fileArray = files[key];
      for (const file of fileArray) {
        for (const validator of validators) {
          const isValid = await validator.isValid(file);
          if (!isValid) {
            throw new BadRequestException(validator.buildErrorMessage(file));
          }
        }
      }
    }

    return files;
  })();
}
