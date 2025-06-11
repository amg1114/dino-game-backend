import { BadRequestException } from '@nestjs/common';

export class AccountDeletedException extends BadRequestException {
  constructor() {
    super({
      statusCode: 400,
      error: 'ACCOUNT_DELETED',
      message: 'La cuenta ya fue eliminada. ¿Deseas recuperarla?',
    });
  }
}
