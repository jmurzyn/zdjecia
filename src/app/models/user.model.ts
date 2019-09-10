import { Photo } from './photo.model';

export class User
{
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    photos: Array<Photo>;
}
