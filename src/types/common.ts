export interface PaginationParams {
    startDate?: Date;
    endDate?: Date;
    page: number;
    limit: number;
}

export type PaginationQuery = {
    [K in keyof PaginationParams]?: string;
};
