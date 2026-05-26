// src/generators/apiError.generator.ts

export function generateApiErrorFile(
  typescript: boolean,
) {
  if (typescript) {
    return `
export class ApiError extends Error {
  statusCode: number;

  constructor(
    message: string,
    statusCode: number = 500
  ) {
    super(message);

    this.statusCode = statusCode;

    Object.setPrototypeOf(
      this,
      ApiError.prototype
    );
  }
}
`;
  }

  return `
export class ApiError extends Error {
  constructor(
    message,
    statusCode = 500
  ) {
    super(message);

    this.statusCode = statusCode;
  }
}
`;
}