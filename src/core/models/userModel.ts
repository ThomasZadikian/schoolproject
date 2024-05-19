import RoleEnum from "../types/enums/roleEnum";

export interface RegistrationUser {
    last_name : string; 
    first_name : string; 
    email: string; 
    password : string; 
    bio : string; 
    avatar?: Blob; 
    registration_date : Date; 
}

export interface User extends RegistrationUser {
    user_id : number; 
    role : RoleEnum; 
    avatar_id: number, 
    portfolio_id? : number; 
}

export interface UserLogin {
    email : string; 
    password: string
}