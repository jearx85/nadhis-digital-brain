"use client";

// import { ReactNode } from "react";
// import { ConvexReactClient } from "convex/react";
// import { ConvexProviderWithClerk } from "convex/react-clerk";
// import { ClerkProvider, useAuth } from "@clerk/clerk-react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// export const ConvexClientProvider = ({
//   children
// }: {
//   children: ReactNode;
// }) => {
//   return (
//     <ClerkProvider
//       publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
//     >
//       <ConvexProviderWithClerk
//         useAuth={useAuth}
//         client={convex}
//       >
//         {children}
//       </ConvexProviderWithClerk>
//     </ClerkProvider>
//   );
// };

import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithAuth } from "convex/react";
import useFusionAuth from "@/hooks/use-fusionauth";
import { useAuthStore } from "@/hooks/use-auth"; // Importa el store de Zustand

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({ children }: { children: ReactNode }) => {
  const auth = useFusionAuth(); // Hook que retorna `isLoading`, `isAuthenticated`, `authenticate`, y `fetchAccessToken`
  const userId = useAuthStore((state) => state.userId); // Obtener el `userId` desde Zustand

  return (
    <ConvexProviderWithAuth client={convex} useAuth={() => ({ ...auth, userId })}>
      {children}
    </ConvexProviderWithAuth>
  );
};



