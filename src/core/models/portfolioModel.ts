import RoleEnum from "../types/enums/roleEnum";

export interface PortFolioModel {
    user_id : number; 
    title : string; 
    description: string; 
}

export interface PortFolio extends PortFolioModel {
    portfolio_id : number; 
    visible: number; 
    creation_date: Date; 
}