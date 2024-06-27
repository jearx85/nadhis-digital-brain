"use client"
import React, { useState, useEffect } from 'react';
import { Modal } from '../../_components/modalLogin';
import WrongCredential from './WrongCredential';
import { useRouter } from 'next/navigation';

export default function PageLogin() {
    const [isLoginModalOpen, setLoginModalOpen] = useState(false);
    const router = useRouter();

  const handleClose = () => {
    router.push("/")
  };

  useEffect(() => {
    setLoginModalOpen(true);
  })

  return (
    <div>
     <Modal isOpen={isLoginModalOpen} onClose={handleClose}>
        <WrongCredential />
      </Modal>
    </div>
  )
}
