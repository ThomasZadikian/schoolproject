export interface ArtworkModelUpload {
    portfolio_id : number; 
    title : string; 
    description: string; 
    media_type: string; 
    file_name: string; 
    file_type: string;
    file_size: number; 
    file_data?: Uint8Array; 
}

export interface ArtworkModel extends ArtworkModelUpload {
    file_data: Uint8Array; 
    visible: number; 
    creation_time: Date;

}