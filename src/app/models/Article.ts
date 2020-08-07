import { Gallery } from './Gallery';
import { Technology } from './Technology';


export interface Article {
    body : string,
    title : string,
    createdOn : string,
    gallery: Array<Gallery>,
    id: number,
    tags: string
}