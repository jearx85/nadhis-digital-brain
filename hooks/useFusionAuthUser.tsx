import { useEffect, useState } from "react";
import { useAuthStore } from "./use-auth"; // Importa el store global de Zustand

interface User {
  email: string;
  firstName: string;
  lastName: string;
  [key: string]: any; // Si hay más campos, puedes agregarlos aquí
}

const useFusionAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = useAuthStore((state) => state.token); // Obtener el token desde el store global
  const userId = useAuthStore((state) => state.userId); // Obtener el userId desde el store global

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) return; // Si no hay token o userId, no ejecutamos la llamada a la API
      const clientSecret = process.env.NEXT_PUBLIC_FUSIONAUTH_API_KEY || "";
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", clientSecret);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow" as RequestRedirect,
      };

      try {
        // Cambia la URL para incluir dinámicamente el userId
        const response = await fetch(`http://34.174.97.159:9011/api/user/${userId}`, requestOptions);

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          console.error("No se pudo obtener la información del usuario");
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUser();
  }, [token, userId]); 

  return { user, userId }; // Retorna tanto el usuario como el userId
};

export default useFusionAuthUser;
