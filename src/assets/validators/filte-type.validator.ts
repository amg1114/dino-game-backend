import { FileValidator } from '@nestjs/common';
import { IFile } from '@nestjs/common/pipes/file/interfaces';

export interface ValidationOptions {
  allowedTypes?: string[];
}

export class FileTypeValidator extends FileValidator<ValidationOptions, IFile> {
  /**
   * Options used to configure the validation behavior.
   * This property allows customization of validation rules
   * and error handling for specific use cases.
   * default: { allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'] }
   */
  protected validationOptions: ValidationOptions;

  constructor(
    validationOptions: ValidationOptions = {
      allowedTypes: ['image/png', 'image/jpeg', 'image/jpg'],
    },
  ) {
    super(validationOptions); // Pass the options to the parent class
    this.validationOptions = validationOptions; // Ensure the property is always defined
  }

  isValid(
    file?: IFile | IFile[] | Record<string, IFile[]>,
  ): boolean | Promise<boolean> {
    if (Array.isArray(file)) {
      return file.every((f) => this.validate(f));
    } else if (
      typeof file === 'object' &&
      file !== null &&
      !Array.isArray(file) &&
      Object.values(file).every((val) => Array.isArray(val))
    ) {
      // file es Record<string, IFile[]>
      return Object.values(file)
        .flat()
        .every((f) => this.validate(f));
    } else if (file && typeof file === 'object' && 'mimetype' in file) {
      // file es IFile
      return this.validate(file as IFile);
    }
    return false;
  }

  validate(file: IFile): boolean {
    const allowedTypes = this.validationOptions.allowedTypes || [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    return allowedTypes.includes(file.mimetype);
  }

  buildErrorMessage(file: any): string {
    const allowedTypes = this.validationOptions.allowedTypes || [
      'image/png',
      'image/jpeg',
      'image/jpg',
    ];
    return `El tipo de archivo ${file.mimetype} no es válido. Se permiten solo: ${allowedTypes.join(
      ', ',
    )}`;
  }
}
