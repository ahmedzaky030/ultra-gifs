import { Meta } from "./meta.model";
import { Pagination } from "./pagination.model";


export interface ApiResponse<T> {
    data: T[] ,
    pagination?: Pagination,
    meta: Meta
}