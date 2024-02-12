import React, { useState } from 'react'
import { ChevronsLeft, FileSearch2, MessageSquare, CalendarDays  } from 'lucide-react';
import { Tooltip } from 'react-tooltip';

export default function navOffcanvas() {

    const [activeComponent, setActiveComponent] = useState('ChatboxOutline');

    function handleComponentClick(componentName: any) {
      setActiveComponent(componentName);
    }
  return (
    <div>
         <button
                className="nav-offcanvas-item"
                id="AIChat"
                onClick={() => handleComponentClick('ChatboxOutline')}
                data-tooltip-id="AIchat-tooltip"
                data-tooltip-content="Asistente"
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
      
    </div>
  )
}
