import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


// Import PrimeReact CSS (essential for styling)
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

export default function GestionTareas() {
  // Hardcoded customer data
  // Hardcoded customers data
  const [customers] = useState([
    {
        id: 1,
        name: 'Juan Pérez',
        country: { name: 'Mexico' },
        company: 'Acme Corporation',
        representative: { name: 'María González' },
        status: 'Active'
    },
    {
        id: 2,
        name: 'Ana Rodríguez',
        country: { name: 'Argentina' },
        company: 'Tech Innovations',
        representative: { name: 'Carlos Martínez' },
        status: 'Pending'
    },
    {
        id: 3,
        name: 'Luis Sánchez',
        country: { name: 'Spain' },
        company: 'Global Solutions',
        representative: { name: 'Elena López' },
        status: 'Active'
    },
    {
        id: 4,
        name: 'Carmen Ruiz',
        country: { name: 'Colombia' },
        company: 'Digital Systems',
        representative: { name: 'Pedro Ramírez' },
        status: 'Inactive'
    },
    {
        id: 5,
        name: 'Miguel Torres',
        country: { name: 'Chile' },
        company: 'Innovation Labs',
        representative: { name: 'Laura Fernández' },
        status: 'Active'
    },
    {
        id: 6,
        name: 'Sofia Morales',
        country: { name: 'Peru' },
        company: 'Business Consulting',
        representative: { name: 'Diego Castro' },
        status: 'Pending'
    },
    {
        id: 7,
        name: 'Roberto Guzmán',
        country: { name: 'Brazil' },
        company: 'Tech Solutions',
        representative: { name: 'Camila Silva' },
        status: 'Active'
    }
]);

// Status template to add color to status column
const statusBodyTemplate = (rowData) => {
    const statusColorMap = {
        'Active': 'success',
        'Pending': 'warning',
        'Inactive': 'danger'
    };

    return (
        <span className={`p-tag p-tag-${statusColorMap[rowData.status]}`}>
            {rowData.status}
        </span>
    );
};

return (
    <div className="card">
        <DataTable 
            value={customers} 
            scrollable 
            scrollHeight="400px"
            paginator 
            rows={5} 
            rowsPerPageOptions={[5, 10, 25, 50]} 
            tableStyle={{ minWidth: '50rem' }}
            showGridlines
            stripedRows
        >
            <Column field="id" header="ID" style={{ width: '10%' }}></Column>
            <Column field="name" header="Name" style={{ width: '20%' }}></Column>
            <Column field="country.name" header="Country" style={{ width: '20%' }}></Column>
            <Column field="company" header="Company" style={{ width: '20%' }}></Column>
            <Column field="representative.name" header="Representative" style={{ width: '20%' }}></Column>
            <Column 
                field="status" 
                header="Status" 
                body={statusBodyTemplate} 
                style={{ width: '10%' }}
            ></Column>
        </DataTable>
    </div>
);
}
