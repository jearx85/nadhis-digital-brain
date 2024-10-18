// "use client";

// import { useEffect, useState } from "react";
// import { File } from "lucide-react";
// import { useQuery } from "convex/react";
// import { useRouter } from "next/navigation";
// // import { useUser } from "@clerk/clerk-react";

// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList
// } from "@/components/ui/command";
// import { useSearch } from "@/hooks/use-search";
// import { api } from "@/convex/_generated/api";
// import useFusionAuthUser from "@/hooks/useFusionAuthUser";

// export const SearchCommand = () => {
//   // const { user } = useUser();
//   const user = useFusionAuthUser();
//   const router = useRouter();
//   const documents = useQuery(api.documents.getSearch);
//   const [isMounted, setIsMounted] = useState(false);

//   const toggle = useSearch((store) => store.toggle);
//   const isOpen = useSearch((store) => store.isOpen);
//   const onClose = useSearch((store) => store.onClose);

//   useEffect(() => {
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     const down = (e: KeyboardEvent) => {
//       if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
//         e.preventDefault();
//         toggle();
//       }
//     }

//     document.addEventListener("keydown", down);
//     return () => document.removeEventListener("keydown", down);
//   }, [toggle]);

//   const onSelect = (id: string) => {
//     router.push(`/documents/${id}`);
//     onClose();
//   };

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <CommandDialog open={isOpen} onOpenChange={onClose}>
//       <CommandInput
//         placeholder={`Search ${user?.fullName}'s Digital Brain...`}
//         // placeholder={`Search user's Digital Brain...`}
//       />
//       <CommandList>
//         <CommandEmpty>No results found.</CommandEmpty>
//         <CommandGroup heading="Documents">
//           {documents?.map((document) => (
//             <CommandItem
//               key={document._id}
//               value={`${document._id}-${document.title}`}
//               title={document.title}
//               onSelect={() => onSelect(document._id)}
//             >
//               {document.icon ? (
//                 <p className="mr-2 text-[18px]">
//                   {document.icon}
//                 </p>
//               ) : (
//                 <File className="mr-2 h-4 w-4" />
//               )}
//               <span>
//                 {document.title}
//               </span>
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </CommandDialog>
//   )
// }

"use client";

import { useEffect, useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";
import useFusionAuthUser from "@/hooks/useFusionAuthUser";

export const SearchCommand = () => {
  const user = useFusionAuthUser(); // Obtenemos el user desde el hook
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  
  // Verificar si user está disponible
  const userId = user.userId; // Asegúrate de que tu hook devuelve el userId correctamente
  const documents = useQuery(api.documents.getSearch, { userId }); // Pasar userId a la consulta
  
  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle]);

  const onSelect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${user?.user?.firstName}'s Digital Brain...`}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documents?.map((document) => (
            <CommandItem
              key={document._id}
              value={`${document._id}-${document.title}`}
              title={document.title}
              onSelect={() => onSelect(document._id)}
            >
              {document.icon ? (
                <p className="mr-2 text-[18px]">
                  {document.icon}
                </p>
              ) : (
                <File className="mr-2 h-4 w-4" />
              )}
              <span>
                {document.title}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
