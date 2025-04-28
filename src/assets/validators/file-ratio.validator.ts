import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';
import * as sharp from 'sharp';

interface ValidationOptions {
  width?: number;
  height?: number;
}

interface LFile extends IFile {
  buffer: Buffer;
}
export class FileRatioValidator extends FileValidator<
  ValidationOptions,
  LFile
> {
  constructor(
    protected readonly validationOptions: ValidationOptions = {
      width: 16,
      height: 9,
    },
  ) {
    super(validationOptions);
  }

  async isValid(
    file?: LFile | LFile[] | Record<string, LFile[]>,
  ): Promise<boolean> {
    if (Array.isArray(file)) {
      return file.every((f) => this.validate(f));
    } else if (
      typeof file === 'object' &&
      file !== null &&
      !Array.isArray(file) &&
      Object.values(file).every((val) => Array.isArray(val))
    ) {
      // file es Record<string, LFile[]>
      return Object.values(file)
        .flat()
        .every((f) => this.validate(f));
    } else if (file && typeof file === 'object' && 'mimetype' in file) {
      // file es LFile
      return this.validate(file as LFile);
    }
    return false;
  }

  async validate(file: LFile): Promise<boolean> {
    const { width, height } = this.validationOptions;

    if (!width || !height) {
      return true; // No validation needed if width or height is not provided
    }

    try {
      const metadata = await sharp(file.buffer).metadata();
      return width / height === metadata.width / metadata.height;
    } catch (error) {
      return false;
    }
  }

  buildErrorMessage(file: any): string {
    const { width, height } = this.validationOptions;
    return `El archivo ${file.fieldname} no tiene la relación de aspecto ${width}:${height}.`;
  }
}
