
interface ICreateUserDTO {
   name: string;
   email: string;
   password: string;
   driver_license: string;
   isAdmin?: boolean,
   id?: string;
   avatar?: string;
}

export { ICreateUserDTO };