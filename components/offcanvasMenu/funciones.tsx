const urlBase = "http://192.168.50.230:8087"

//=============================> Query para listar categorías <=============================
export async function queryCategory(): Promise<any> {
    const url = `${urlBase}/categoria`;
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
    const url = `${urlBase}/categorias?category=${category}`;
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
    const url = `${urlBase}/query/${titulo}`;
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

