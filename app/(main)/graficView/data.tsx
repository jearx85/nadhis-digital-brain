// export var nodes = [
//     {
//       id: 1,
//       label: "Doc 1",
//       title: "Informe"
//     },
//     {
//       id: 2,
//       label: "Doc 2",
//       title: "Informe 2",
   
//     },
//     {
//       id: 3,
//       label: "Doc 3",
//       title: "Informe 3",
   
//     },
//     {
//       id: 4,
//       label: "Doc 4",
//       title: "Informe 4",
   
//     }
//     ,
//     {
//       id: 5,
//       label: "Doc 5",
//       title: "Informe 5",
   
//     }
// ]

interface Node {
    id: number;
    label: string;
    title: string;
}
export var nodes : Node[] = []

for(let i = 0; i <10; i++){
    const format: any = {
        id: i,
        label: `Doc ${i}`,
        title: `Informe ${i}`,
    }
  nodes.push(format)
}

export var edges = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 5 },
    { from: 4, to: 5 }
]