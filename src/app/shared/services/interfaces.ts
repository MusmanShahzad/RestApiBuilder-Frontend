export interface Table {
  id: string;
  name: string;
  columns: Column[];
}
export interface Column {
  id: string;
  name: string;
  type: number;
  key ?: number;
  length: number;
  default: number;
  null: boolean;
}
export interface Database {
  _id: string;
  id: string;
  name: string;
  tables: Table[];
}
export interface Project{
  id: string;
  name: string;
  database: Database
}
