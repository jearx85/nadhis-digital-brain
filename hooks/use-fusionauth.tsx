import { useEffect } from "react";
import { useAuthStore } from "./use-auth"; // Asegúrate de importar el store correctamente

const useFusionAuth = () => {
  const isLoading = useAuthStore((state: any) => state.isLoading);
  const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
  const token = useAuthStore((state: any) => state.token);
  const setIsAuthenticated = useAuthStore((state: any) => state.setIsAuthenticated);
  const setToken = useAuthStore((state: any) => state.setToken);
  const setIsLoading = useAuthStore((state: any) => state.setIsLoading);
  const setUserId = useAuthStore((state: any) => state.setUserId); // Nueva función para almacenar el ID

  // La función que se encarga de autenticar con email y password
  const authenticate = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const clientId = process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_ID || "";
      const clientSecret = process.env.NEXT_PUBLIC_FUSIONAUTH_CLIENT_SECRET || "";

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("client_id", clientId);
      urlencoded.append("client_secret", clientSecret);
      urlencoded.append("grant_type", "password");
      urlencoded.append("username", email); 
      urlencoded.append("password", password); 

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow" as RequestRedirect,
      };

      const response = await fetch("http://34.174.97.159:9011/oauth2/token", requestOptions);

      // Verifica si la respuesta es correcta
      if (response.ok) {
        const data = await response.json();  // Convierte la respuesta en JSON

        if (data?.access_token) {
          setToken(data.access_token);  // Guarda el token en el store global
          setIsAuthenticated(true);    // Marca como autenticado

          // Aquí asumo que la respuesta contiene el `user_id`
          if (data?.userId) {
            setUserId(data.userId); // Guarda el userId en el store
          }
        } else {
          console.error("No se recibió un token de acceso");
          setIsAuthenticated(false);
        }
      }  else {
        console.error("Error en la solicitud:", response.statusText);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error en la autenticación:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAccessToken = async () => {
    return token ?? ''; // Devuelve el token para Convex
  };

  return {
    isLoading,
    isAuthenticated,
    authenticate, // Devuelve la función de autenticación para usarla en el componente de login
    fetchAccessToken,
  };
};

export default useFusionAuth;
