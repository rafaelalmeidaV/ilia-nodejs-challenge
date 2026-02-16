export class AuthenticateDto {
  email: string;
  password: string;
}

export class AuthResponseDto {
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  access_token: string;
}
