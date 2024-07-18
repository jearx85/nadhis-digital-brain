import 'react-tooltip/dist/react-tooltip.css';
import './AIChat.css';
import React, { useEffect, useRef, useState } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

const response = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In diam ipsum, vestibulum a vulputate id, porta at dui. Cras rutrum orci non pretium convallis. Phasellus aliquam tortor fermentum justo interdum, vel mattis nisl pharetra. Sed commodo turpis eget molestie suscipit. Nullam sed felis at nunc sagittis pharetra. Duis eget luctus eros.',
];

export default function AIChat() {
  const [chatMessage, setChatMessage] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const chatTextAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleSendClick = () => {
    const message = chatTextAreaRef.current?.value;
    setChatMessage(message || '');

    if (message && message.trim() !== '') {
      setChatMessage(message);
      setDisplayedText(''); // Reinicia el texto mostrado
      setWordIndex(0); // Reinicia el índice de palabras

      if (chatTextAreaRef.current) {
        chatTextAreaRef.current.value = '';
      }
    }
  };

  const handleNewChat = () => {
    setChatMessage('');
    setDisplayedText('');
    setWordIndex(0);

    if (chatTextAreaRef.current) {
      chatTextAreaRef.current.value = '';
    }
  };

  useEffect(() => {
    if (chatMessage) {
      const words: any = response[0]?.split(/\s+/);

      const interval = setInterval(() => {
        if (wordIndex < words.length) {
          setDisplayedText(
            (prevText: string) => prevText + ' ' + words[wordIndex],
          );
          setWordIndex((prevIndex: number) => prevIndex + 1);
        } else {
          clearInterval(interval);
        }
      }, 40);

      return () => clearInterval(interval);
    }

    return () => {};
  }, [chatMessage, wordIndex]);

  return (
    <>
      <div className="chat-header rounded-lg h-8 w-full">
        <button
          className="chat-header-icon border-none bg-transparent"
          onClick={handleNewChat}
          data-tooltip-id="new-chat-tooltip"
          data-tooltip-content="Nuevo chat"
        >
          <IoAddOutline />
        </button>
        <Tooltip id="new-chat-tooltip" />
      </div>

      <hr className="mb-10 border-b-2 dark:border-slate-900"/>

      <div className="h-96 response-area rounded-lg dark:bg-[#121212]">
        <div className="main-chat">
          <div className="textUser">
            {/* <p>hola</p> */}
          </div>
          {displayedText && (
            <div className="user-message bg-lightgray p-10 rounded overflow-hidden break-words whitespace-normal max-w-200 dark:bg-gray-600 bg-gray-300">
              <p>{displayedText}</p>
            </div>
          )}
        </div>
      </div>

      <div className="request-chat flex mt-5">
        <textarea autoFocus ref={chatTextAreaRef} 
          className="request-chat-area mt-5 w-full p-2 bg-gray-300 rounded-lg dark:bg-[#121212]" 
          rows={3} cols={50}
        />
      </div>
      <button 
        className="border-solid border-2 border-gray-400 mt-5 rounded-lg px-2 py-2 hover:bg-neutral-200 dark:hover:bg-slate-500" 
        onClick={handleSendClick}
      >
        Enviar
      </button>
    </>
  );
}
