import 'react-calendar/dist/Calendar.css';
import React, { useState } from 'react';
import Calendar from 'react-calendar';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyCalendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className="Mycalendar">
      <h1>Calendario</h1>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}
