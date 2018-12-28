import { Product } from './product';
import { Lead } from './lead';
import { Contact } from './contact';

export interface Business{
    profile : {

        name: string;
        overview : string ;
        industry : string ;
        estYear : number;
        firmType : string;
        expLevel : string;
        noOfEmployees : number;
        nature : string;
    };

    products : string;

    catalogue : Product[];

    contact : Contact;

    leads : Lead[];
}