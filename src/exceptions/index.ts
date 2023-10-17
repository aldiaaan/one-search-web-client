export class ClientException extends Error {
  status: number
  code: string

  constructor(
    args: { code: string; status: number; message: string } = {
      code: 'CLIENT_ERROR',
      status: 500,
      message: 'Something went wrong, please try again.'
    }
  ) {
    super(args.message)
    this.status = args.status
    this.code = args.code
  }

  toJSON() {
    return {
      code: this.code,
      status: this.status,
      message: this.message
    }
  }
}

export class NotFoundException extends ClientException {
  constructor(message: string = '???') {
    super({
      code: 'NOT_FOUND_ERROR',
      message,
      status: 404
    })
  }
}

export class InvalidCredentialException extends ClientException {}
