export interface GifModel {
    type: string;
    id: string;
    slug: string;
    url: string;
    bitly_url: string;
    embed_url: string;
    rating: Rating;
    title: string;
}

export enum Rating {
    Y = 'y',
    G = 'g',
    PG = 'pg',
    PG_13 = 'pg-13',
    R = 'r'
}