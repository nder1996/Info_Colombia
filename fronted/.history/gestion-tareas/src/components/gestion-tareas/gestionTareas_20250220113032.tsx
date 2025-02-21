import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function GestionTareas() {
  // Hardcoded customer data
  const [customers] = useState([
    {
      name: 'Juan Pérez',
      country: { name: 'Mexico' },
      company: 'Acme Corporation',
      representative: { name: 'María González' }
    },
    {
      name: 'Ana Rodríguez',
      country: { name: 'Argentina' },
      company: 'Tech Innovations',
      representative: { name: 'Carlos Martínez' }
    },
    {
      name: 'Luis Sánchez',
      country: { name: 'Spain' },
      company: 'Global Solutions',
      representative: { name: 'Elena López' }
    },
    {
      name: 'Carmen Ruiz',
      country: { name: 'Colombia' },
      company: 'Digital Systems',
      representative: { name: 'Pedro Ramírez' }
    },
    {
      name: 'Miguel Torres',
      country: { name: 'Chile' },
      company: 'Innovation Labs',
      representative: { name: 'Laura Fernández' }
    },
    {
      name: 'Sofia Morales',
      country: { name: 'Peru' },
      company: 'Business Consulting',
      representative: { name: 'Diego Castro' }
    },
    {
      name: 'Roberto Guzmán',
      country: { name: 'Brazil' },
      company: 'Tech Solutions',
      representative: { name: 'Camila Silva' }
    },
    {
      name: 'Isabel Navarro',
      country: { name: 'Ecuador' },
      company: 'Global Enterprises',
      representative: { name: 'Andrés Herrera' }
    },
    {
      name: 'Fernando Ortiz',
      country: { name: 'Uruguay' },
      company: 'Strategic Partners',
      representative: { name: 'Valentina Moreno' }
    },
    {
      name: 'Mariana Jiménez',
      country: { name: 'Costa Rica' },
      company: 'Innovative Technologies',
      representative: { name: 'Ricardo Campos' }
    }
  ]);

  return (
    <div className="card" style={width: '100%'}>
      <DataTable
        value={customers}
        paginator
        rows={5}
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ width: '100%'}}
        scrollable 
        scrollHeight="400px">
        <Column field="name" header="Name" style={{ width: '25%' }}></Column>
        <Column field="country.name" header="Country" style={{ width: '25%' }}></Column>
        <Column field="company" header="Company" style={{ width: '25%' }}></Column>
        <Column field="representative.name" header="Representative" style={{ width: '25%' }}></Column>
      </DataTable>
    </div>
  );
}
