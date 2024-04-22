import Image from "next/image";


export const Logo = () => {
  return (
    <div >
      <Image
        src="/logo_nadhis.png"
        height={200}
        width={200}
        alt="Logo"
        className="dark:hidden"
      />
      <Image
        src="/logo_nadhis-dark.png"
        height={200}
        width={200}
        alt="Logo"
        className="hidden dark:block"
      />
    </div>
  )
}