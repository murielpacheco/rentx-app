

interface ICreateUserTokenDTO {
   refresh_token: string;
   user_id: string;
   expires_at: Date;
}

export { ICreateUserTokenDTO };