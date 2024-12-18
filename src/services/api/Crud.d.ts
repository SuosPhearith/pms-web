

interface Pagination{
    current: number = 1;
    pageSize: number = 20;
}
interface PageRequest<T> {
    param?: T;
    page: Pagination;
    sort?: any;
  }


export type ListRequest <T>= {
    page?:number;
    count?:number;
    pageSize?:number =20;
    param:T
}

export type ListPaging={
    page?:number;
    count?:number;
    pageSize?:number
}

export type RequestActions = {
    start?: (serviceName?: string) => void;
    request?: { loading?: boolean, failed?: boolean, message?: string };
    end?: (status: 'SUCCESS' | 'FAILED', reason?: string) => void;
  };