import { Title } from "@/app/(main)/_components/title";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";


//=============================> Query para listar categorías <=============================
export async function queryCategory(): Promise<any> {
    const url = 'http://192.168.50.230:8087/categoria';
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos para la consulta');
      }
      const data = await response.json(); // Parse JSON from the response
      // console.log(data)
  
      return data;
    } catch (error: any) {
      console.log('Error en la conslta:', error.message);
    }
  
    return null;
  }
  
  //----------------------------------------------------------------
  //=============================> buscar doc por categoria asociada <=============================
  
  export async function queryCategories(category: string): Promise<any> {
    const url = `http://192.168.50.230:8087/categorias?category=${category}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error('No se pudo obtener los datos para la consulta');
      }
      const data = await response.json(); // Parse JSON from the response
  
      return data;
    } catch (error: any) {
      console.log('Error en la conslta:', error.message);
    }
  
    return null;
  }
  
  export async function getContent(titulo: string) {
    const url = `http://192.168.50.230:8087/query/${titulo}`;
    try {
      const result = await fetch(url, {
        method: 'GET',
      });
  
      return result;
    } catch (error: any) {
      console.log('Error en la conslta:', error.message);
    }
  
    return null;
  }
//================================================================
  // async function listarDocsVault(titulo: string) {
  //   const params = useParams();

  //   const document = useQuery(api.documents.getById, {
  //     documentId: params.documentId as Id<"documents">,
  //   });

  //   const noteTitle = < Title initialData={document}/>



  //   const selected = titulo; // Obtiene el título al que le diste clic
  //   const files = app.vault.getFiles(); // Obtener todos los documentos del vault
  //   const titulos = [];
  //   const rutas = [];

  //   for (let i = 0; i < files.length; i++) {
  //     titulos.push(files[i].basename);
  //     rutas.push(files[i].path);

  //     if (!titulos.includes(selected)) {
  //       titulos.splice(0, 0, selected); // Agregar el elemento seleccionado en la primera posición
  //     }

  //     if (files[i].path.includes(titulo)) {
  //       const ruta = files[i].path;

  //       // Enviar la lista de títulos como un arreglo
  //       try {
  //         const response = await fetch("http://192.168.50.236:8087/relacion/", {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(titulos),
  //         });

  //         if (response.status === 201) {
  //           const noteTitle = < Title initialData={document}/>
  //           const noteContent = await response.json();
  //           await updateNoteContent(app.vault, noteTitle, noteContent);
  //           await validarNotaAbierta(noteTitle);
  //           //await openDocuments(noteTitle);//espera a que la nota se cree y luego la abre
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }

  //   const ruta = rutas.find((item) => item.includes(titulo));
  //   if (!ruta) {
  //     try {
  //       const response = await fetch("http://192.168.50.236:8087/relacion/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(titulos),
  //       });

  //       if (response.status === 201) {
  //         const noteTitle = titulo; // Título de la nota
  //         const noteContent = await response.json();
  //         await createNoteAndSetContent(noteTitle, noteContent);

  //         const existNote = checkNoteExists(app.vault, titulo); // Verificar si la nota ya existe
  //         existNote
  //           .then(async (res) => {
  //             if (!res) {
  //               await openDocuments(`${titulo}.md`); // espera a que la nota se cree y luego la abre
  //             }
  //           })
  //           .catch((error: any) => console.log(error));
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }  
