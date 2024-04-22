import { FindOptionsWhere } from "typeorm";
import { Categoria } from "../categoria.entity";

export interface CategoriaQueries extends FindOptionsWhere<Categoria> {
  title?: string;
  limit?: number;
}
