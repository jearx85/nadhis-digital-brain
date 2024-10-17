// export default {
//   providers: [
//     {
//       domain: "https://dear-stallion-95.clerk.accounts.dev",
//       applicationID: "convex",
//     }
//   ]
// }

export default {
  providers: [
    {
      domain: process.env.NEXT_PUBLIC_CONVEX_URL,
      applicationID: "convex",
    },
  ],
};