import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
  args: { 
    id: v.id("documents"),
    userId: v.optional(v.string()), // Añadimos el userId como argumento
  },
  handler: async (ctx, args) => {
    const { userId } = args; // Obtenemos el userId de los argumentos

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });

        await recursiveArchive(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });

    await recursiveArchive(args.id); // Asegúrate de esperar la función recursiva

    return document;
  }
});

export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
    userId: v.optional(v.string()), // Aseguramos que se reciba el userId como argumento
  },
  handler: async (ctx, { parentDocument, userId }) => {
    // Verificar si el userId está presente
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Consultar los documentos que pertenecen al userId y al parentDocument
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q
          .eq("userId", userId) // Usamos el userId pasado como argumento
          .eq("parentDocument", parentDocument)
      )
      .filter((q) =>
        q.eq(q.field("isArchived"), false)
      )
      .order("desc")
      .collect();

    return documents; // Devolver los documentos
  },
});

//-----------------------------
export const getAllDocuments = query({
  handler: async (ctx, { userId }: any) => {
    // Verificar si se pasó el `userId`
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Consultar los documentos que pertenecen al `userId` y que no están archivados
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId)) // Usamos el userId pasado desde el frontend
      .filter((q) => q.eq(q.field("isArchived"), false)) // Filtrar los documentos no archivados
      .order("desc") // Ordenar en orden descendente
      .collect(); // Recoger todos los documentos filtrados

    return documents; // Devolver la lista de documentos
  },
});

//-----------------------------

export const create = mutation({
  args: {
    title: v.string(),
    parentDocument: v.optional(v.id("documents")),
    userId: v.optional(v.string()), // Asegúrate de que el userId también se pase como argumento
  },
  handler: async (ctx, args) => {
    // El userId ahora se pasa directamente como argumento
    const { userId }: any = args;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  }
});

//-----------------
export const createNote = mutation({
  args: {
    title: v.string(),
    content: v.optional(v.string()),
    parentDocument: v.optional(v.id("documents")),
    userId: v.string(), // Añadimos el userId como argumento
  },
  handler: async (ctx, args) => {
    const { userId, title, content, parentDocument } = args; // Obtenemos el userId de los argumentos

    const document = await ctx.db.insert("documents", {
      title,
      content,
      parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  }
});



//-----------------

export const getTrash = query({
  args: {
    userId: v.optional(v.string()), // Añadimos el userId como argumento
  },
  handler: async (ctx, { userId }) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();

    return documents;
  }
});

export const restore = mutation({
  args: {
    id: v.id("documents"),
    userId: v.string(), // Añadimos el userId como argumento
  },
  handler: async (ctx, { id, userId }) => {
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Función recursiva para restaurar los documentos hijos
    const recursiveRestore = async (documentId: any) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    };

    // Aseguramos que el tipo options permita parentDocument opcionalmente
    const options: Partial<{
      isArchived: boolean;
      parentDocument?: Id<"documents"> | undefined; // En lugar de string | null, usamos Id<"documents"> o undefined
    }> = {
      isArchived: false,
    };

    // Si el documento tiene un documento padre archivado, quitamos el documento padre
    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(id, options);

    // Restauramos recursivamente los documentos hijos
    await recursiveRestore(id);

    return document;
  }
});

export const remove = mutation({
  args: {
    id: v.id("documents"),
    userId: v.string(), // Añadimos el userId como argumento
  },
  handler: async (ctx, { id, userId }) => {
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Document not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    // Eliminamos el documento
    const document = await ctx.db.delete(id);

    return document;
  }
});

export const getSearch = query({
  handler: async (ctx, { userId }: any) => {
    // Verificar si el userId está presente
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Consultar los documentos que pertenecen al userId
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) =>
        q.eq(q.field("isArchived"), false),
      )
      .order("desc")
      .collect();

    return documents;
  },
});

export const getById = query({
  args: {
    documentId: v.id("documents"),
    userId: v.optional(v.string()) // Añadimos el userId como argumento opcional
  },
  handler: async (ctx, { documentId, userId }) => {
    const document = await ctx.db.get(documentId);

    if (!document) {
      throw new Error("Document not found");
    }

    // Si el documento está publicado y no archivado, se puede devolver sin autenticación
    if (document.isPublished && !document.isArchived) {
      return document;
    }

    // Si el documento no está publicado, necesitamos un userId para la autenticación
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verificamos si el documento pertenece al usuario autenticado
    if (document.userId !== userId) {
      throw new Error("Unauthorized");
    }

    return document;
  }
});

// 1. Mutación para actualizar un documento
export const update = mutation({
  args: {
    id: v.id("documents"),
    userId: v.optional(v.string()), // Añadimos el userId como argumento opcional
    title: v.optional(v.string()),
    content: v.optional(v.string()),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
    isPublished: v.optional(v.boolean())
  },
  handler: async (ctx, { id, userId, ...rest }) => {
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(id, { ...rest });
    return document;
  }
});

// 2. Mutación para eliminar el ícono de un documento
export const removeIcon = mutation({
  args: { id: v.id("documents"), userId: v.optional(v.string()) },
  handler: async (ctx, { id, userId }) => {
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(id, {
      icon: undefined
    });

    return document;
  }
});

// 3. Mutación para eliminar la imagen de portada de un documento
export const removeCoverImage = mutation({
  args: { id: v.id("documents"), userId: v.optional(v.string()) },
  handler: async (ctx, { id, userId }) => {
    const existingDocument = await ctx.db.get(id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const document = await ctx.db.patch(id, {
      coverImage: undefined
    });

    return document;
  }
});

// 4. Mutación para obtener el ID de un documento a partir de su título
export const getTitleId = mutation({
  args: { title: v.optional(v.string()), userId: v.optional(v.string()) },
  handler: async (ctx, { title, userId }) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("title"), title))
      .order("desc")
      .first();

    return documents?._id;
  }
});

// 5. Mutación para obtener el título de un documento a partir de su ID
export const getIdTitle = mutation({
  args: { id: v.id("documents"), userId: v.optional(v.string()) },
  handler: async (ctx, { id, userId }) => {
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("_id"), id))
      .order("desc")
      .first();

    return documents?.title;
  }
});

// 6. Consulta para obtener un documento por ID
export const getDocument = query({
  args: { documentsId: v.id("documents") },
  handler: async (ctx, { documentsId }) => {
    const doc = await ctx.db.get(documentsId);
    return doc;
  }
});

