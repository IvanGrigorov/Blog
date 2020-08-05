import { Gallery } from '../../app/models/Gallery';
import { Technology } from '../../app/models/Technology';


export interface Project {
    description : string,
    title : string,
    createdOn : string,
    technologies : Array<Technology>,
    gallery: Array<Gallery>,
    id: number,
    website: string
}