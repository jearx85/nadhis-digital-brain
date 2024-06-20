"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";

import { useRouter } from "next/navigation";
import { Modal } from "./modalLogin";
import LoginComponent from "../login/LoginComponent";

export const Heading = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    setLoginModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div className="hidden bg-cover lg:block lg:w-2/3">
          <div className="relative h-screen">
            <Image
              src="/smartCity.jpg"
              alt="Smart City"
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-20 bg-gray-900 bg-opacity-40">
              <h2 className="text-8xl font-bold text-white">Smart Governance</h2>
              <p className="max-w-xl mt-8 text-gray-300">
                El uso de los datos para facilitar y apoyar una mejor toma de decisiones y planificación dentro de los órganos de gobierno.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex-1 text-center p-5 border rounded-2xl shadow-2xl dark:bg-gray-800">
                <div className="flex justify-between">
                  <ModeToggle />
                </div>
                <br />
                <hr />
                <br />
                <p>Ingresa a tu cuenta</p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-5 bg-slate-200 dark:bg-slate-500 mt-2"
                  onClick={handleLogin}
                >
                  Log in
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <div className="mt-10">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      Sus ideas, documentos y planes unificado. Bienvenido a{" "}
                      <span className="underline">Smart Decisions Platform</span>
                    </h2>
                    <h3 className="text-base sm:text-xl md:text-2xl font-medium mt-10">
                      Smart Decisions Platform es el espacio de trabajo conectado donde se realiza un trabajo mejor y más rápido.
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isLoginModalOpen} onClose={() => setLoginModalOpen(false)}>
        <LoginComponent />
      </Modal>
    </div>
  );
};
