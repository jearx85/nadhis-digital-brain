"use client";

import cx from 'clsx';
import { useState, useEffect } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import classes from './TableScrollArea.module.css';

const getApiInfo = async () => {
  try {
    const response = await fetch(`http://localhost:8081/ultimos_registros/wazetraffic`);
    const data = await response.json();
    console.log(data.content.rows)

    // Verifica que la respuesta sea un array
    // return Array.isArray(data) ? data : [];
    return data.content.rows;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
};

export default function TablesComponent({props}: any) {
  const [scrolled, setScrolled] = useState(false);
  const [datos, setDatos] = useState<any[]>([]); 

  useEffect(() => {
    getApiInfo().then((data: any) => {
      setDatos(data);

    }).catch((error: any) => {
      console.error("Error processing data: ", error);
      setDatos([]);
    });
  }, []);

  const formatDateTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return isNaN(date.getTime()) ? 'Invalid Date' : date.toLocaleString();
  };

  // const rows = datos.map((row: any, index: number) => {
  //   console.log(row.cells)
  
  //   return (
  //       <Table.Tr key={index}>
  //         <Table.Td>{row.cells.retraso}</Table.Td>
  //         <Table.Td>{parseFloat(row.cells.velocidad).toFixed(1)}</Table.Td>
  //         <Table.Td>{row.calle}</Table.Td>
  //         <Table.Td>{formatDateTime(row.cells.startTimeMillis)}</Table.Td>
  //       </Table.Tr>
  //   );
  // })
  //   (
  //   <Table.Tr key={index}>
  //     <Table.Td>{row.retraso}</Table.Td>
  //     <Table.Td>{parseFloat(row.velocidad).toFixed(1)}</Table.Td>
  //     <Table.Td>{row.calle}</Table.Td>
  //     <Table.Td>{formatDateTime(row.startTimeMillis)}</Table.Td>
  //   </Table.Tr>
  // ));


  const rows = datos.map((row: any, index: number) => (
    <Table.Tr key={index}>
      {row.cells.map((cell: any, cellIndex: number) => (
        <Table.Td key={cellIndex}>
          {cellIndex === 1 ? parseFloat(cell).toFixed(1) : cell}
        </Table.Td>
      ))}
      <Table.Td>{formatDateTime(parseInt(row.cells[3]))}</Table.Td>
    </Table.Tr>
  ));


  return (

      <ScrollArea h={300} onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
        <Table miw={700}>
          {/* <Table.Thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <Table.Tr>
              <Table.Th>Retraso</Table.Th>
              <Table.Th>Velocidad</Table.Th>
              <Table.Th>Calle</Table.Th>
              <Table.Th>Fecha y Hora</Table.Th>
            </Table.Tr>
          </Table.Thead> */}
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>
  );
}