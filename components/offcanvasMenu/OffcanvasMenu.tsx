import { Fragment, useState } from 'react';
import PluginElastic from './plugin/elasticdocs';
import { ChevronsLeft, FileSearch2, MessageSquare, CalendarDays  } from 'lucide-react';
import AIChat from './AIChat/AIChat';
import { Tooltip } from 'react-tooltip';
import './navOffcanvas.css' 
import MyCalendar from './MyCalendar/myCalendar';

const OffcanvasMenu = () => {
  const [open, setOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('ChatboxOutline');

    function handleComponentClick(componentName: any) {
      setActiveComponent(componentName);
    }
 

  return (
    <div className="relative rounded-3xl overflow-y-auto">
      {/* <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
      >
        Abrir Menú
      </button> */}

      <ChevronsLeft className="h-6 w-6 cursor-pointer" onClick={() => setOpen(true)}/>

      {/* Offcanvas */}
      {open && (
        <Fragment>
          {/* Fondo oscuro para el offcanvas */}
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black opacity-50 z-40"
          ></div>

          {/* Contenedor del offcanvas */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white z-50 shadow-lg">
            {/* Cabecera del offcanvas */}
            <div className="flex justify-between items-center bg-gray-500 text-white px-4 py-3">
            <button
                className="nav-offcanvas-item"
                id="AIChat"
                onClick={() => handleComponentClick('ChatboxOutline')}
                data-tooltip-id="AIchat-tooltip"
                data-tooltip-content="Chat"
              >
                <MessageSquare  />
              </button>
              <Tooltip id="AIchat-tooltip" />

              <button
                className="nav-offcanvas-item"
                id="calendar"
                onClick={() => handleComponentClick('CalendarOutline')}
                data-tooltip-id="calendar-tooltip"
                data-tooltip-content="Calendario"
              >
                <CalendarDays  />
              </button>
              <Tooltip id="calendar-tooltip" />

              <button
                className="nav-offcanvas-item"
                id="plugin"
                onClick={() => handleComponentClick('plugin')}
                data-tooltip-id="plugin-tooltip"
                data-tooltip-content="Plugin"
              >
                <FileSearch2 />
              </button>
              <Tooltip id="plugin-tooltip" />

              <button
                className="btn btn-close"
                type="button"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
             
              <button
                onClick={() => setOpen(false)}
                className="text-white  focus:outline-none focus:ring-2 focus:ring-white"
              >
                Cerrar
              </button>
            </div>
            <hr />

            {/* Contenido del offcanvas */}
            <div className="overflow-y-auto max-h-screen">
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