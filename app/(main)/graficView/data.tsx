import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';


//================================================

interface Node{
    id: Id<"documents">;
    // id: number;
    label: string;
    title: string;
}

//============================================================

// export let docs : Node[] = []

// for(let i = 0; i <10; i++){
//     const format: any = {
//         id: i,
//         label: `Doc ${i}`,
//         title: `Informe ${i}`,
//     }
//     docs.push(format)
// }

export const docs =[
    {id: 'j5738a4nrh91de2mc03e9jzsks6mpk0w', "label": 'prueba', "title": 'prueba'},

    {id: 'j576vt3ym5z8q98w6zj9g8bhr16mfdhp', "label": 'Untitled', "title": 'Untitled'},

    {id: 'j57cwxv9q5ryv8xww69qw3m8hh6mfaxx', "label": 'Informe de seguimiento', "title": 'Informe de seguimiento'},

    {id: 'j57827kpkwry7qwqm8z5gwzj0s6m6m4k', "label": 'LEY-1993-DEL-14-DE-AGOSTO-DE-2019', "title": 'LEY-1993-DEL-14-DE-AGOSTO-DE-2019'},

    {id: 'j57apjq97ncq6xkwcyqdt0rsd16kkd7r', "label": 'Untitled', "title": 'Untitled'}
]


export var edges = [
    { from: 'j5738a4nrh91de2mc03e9jzsks6mpk0w', to: 'j576vt3ym5z8q98w6zj9g8bhr16mfdhp' },
    { from: 'j576vt3ym5z8q98w6zj9g8bhr16mfdhp', to: 'j57cwxv9q5ryv8xww69qw3m8hh6mfaxx' },
    
]