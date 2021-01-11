export interface Restapi{
    projectId:string;
    port:number;
    secretKey:string;
    routes:Routes[]
}
export interface Routes{
    path:string;
    auth:boolean;
    methods:any;
}