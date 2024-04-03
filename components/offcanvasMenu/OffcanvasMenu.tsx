import { Fragment, useState } from 'react';
import PluginElastic from './plugin/elasticdocs';
import { FileSearch2, MessageSquare, CalendarDays, Bot  } from 'lucide-react';
import AIChat from './AIChat/AIChat';
import { Tooltip } from 'react-tooltip';
import MyCalendar from './MyCalendar/myCalendar';
import { Item } from '@/app/(main)/_components/item';

const OffcanvasMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('ChatboxOutline');

    function handleComponentClick(componentName: any) {
      setActiveComponent(componentName);
    }
 

  return (
    <div className="relative overflow-y-auto rounded-lg">

      <Item
        label="Asistente"
        icon={Bot}
        onClick={() => setOpen(true)} 
      />

      {/* Offcanvas */}
      {open && (
        <Fragment>
          {/* Fondo oscuro para el offcanvas */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>

          {/* Contenedor del offcanvas */}
          <div className="fixed inset-y-0 right-0 mb-6 mt-2 mr-2 max-w-xs w-full bg-white z-50 shadow-lg rounded-lg overflow-hidden">
            {/* Cabecera del offcanvas */}
            <div className="flex justify-between items-center bg-neutral-100 px-4 py-3 ">
            <button
                className="nav-offcanvas-item"
                id="AIChat"
                onClick={() => handleComponentClick('ChatboxOutline')}
                data-tooltip-id="AIchat-tooltip"
                data-tooltip-content="Chat"
              >
                <MessageSquare
                  style={{
                    color: 'gray'
                  }}
                />
              </button>
              <Tooltip id="AIchat-tooltip" />

              <button
                className="nav-offcanvas-item"
                id="calendar"
                onClick={() => handleComponentClick('CalendarOutline')}
                data-tooltip-id="calendar-tooltip"
                data-tooltip-content="Calendario"
              >
                <CalendarDays  style={{color: 'gray'}}/>
              </button>
              <Tooltip id="calendar-tooltip" />

              <button
                className="nav-offcanvas-item"
                id="plugin"
                onClick={() => handleComponentClick('plugin')}
                data-tooltip-id="plugin-tooltip"
                data-tooltip-content="Plugin"
              >
                <FileSearch2 style={{color: 'gray'}}/>
              </button>
              <Tooltip id="plugin-tooltip" />
             
              <button
                onClick={() => setOpen(false)}
                className="text-black  focus:outline-none focus:ring-2 focus:ring-white"
              >
                Cerrar
              </button>
            </div>
            <hr />

            {/* Contenido del offcanvas */}
            <div className="overflow-y-auto max-h-screen rounded-lg">
              <div className="px-4 py-6">
                {activeComponent === 'CalendarOutline' && (
                    <>
                      <MyCalendar />
                    </>
                  )}
                  {activeComponent === 'ChatboxOutline' && (
                    <>
                      <AIChat />
                    </>
                  )}
                  {activeComponent === 'plugin' && (
                    <>
                      <PluginElastic />
                    </>
                  )}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}

export default OffcanvasMenu;