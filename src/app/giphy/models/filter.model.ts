export interface SearchFilter {
    q: string;
    limit: number;
    offset: number;
    rating?: string;
    lang?: string;
}

export interface TagFilter{
    term: string;
}