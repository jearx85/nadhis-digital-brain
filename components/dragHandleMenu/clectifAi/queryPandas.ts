export const consultarPandasAi = async (data: any) => {
    try {
        const response = await fetch("http://35.223.72.198:8081/clectif_ai", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          mode: "cors",
        });
    
        if (!response.ok) {
          throw new Error("Error en la respuesta del servidor");
        }
    
        const jsonResponse = await response.json();
        return jsonResponse;
    
      } catch (error: any) {
        console.error("Error al realizar la solicitud:", error.message);
        return null;
      }
    };
