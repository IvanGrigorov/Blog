import { Gallery } from './Gallery';
import { Technology } from './Technology';


export interface Article {
    description : string,
    title : string,
    createdOn : string,
    technologies : Array<Technology>,
    gallery: Array<Gallery>,
    id: number,
    website: string
}