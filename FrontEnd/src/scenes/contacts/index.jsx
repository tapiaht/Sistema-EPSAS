import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
//import { mockDataContacts } from "../../data/mockData";
import axios from "axios";
import Header from "../../Components/Header";
import { useTheme } from "@mui/material";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditCustomer from "../../Components/EditCustomer";
const Contacts = () => {
  
  const [customer, setCustomer] = useState({
    nombres: '',
    apellidos: '',
    carnet: '',
    celular: '',
    direccion: ''
    });
    const [editingCustomerId, setEditingCustomerId] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  

  const columns = [  { field: "id", headerName: "ID", flex: 0.5 },    { field: "nombres", headerName: "Nombres" },    {      field: "apellidos",      headerName: "Apellidos",      flex: 1,      cellClassName: "name-column--cell no-border-bottom",    },    {      field: "carnet",      headerName: "Carnet",      type: "number",      headerAlign: "left",      align: "left",    },    { field: "celular", headerName: "Celular", flex: 1 }, { field: "direccion", headerName: "Dirección", flex: 1 },    
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <>
        <IconButton onClick={() => handleEdit(params.row.id)} color="secondary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
          <DeleteIcon />
        </IconButton>
      </>
    ),
  },
  ];
  const handleEdit = (id) => {
    setEditingCustomerId(id);

  };
  

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/customer")
      .then((result) => {
        if (result.data.Status) {
          setCustomer(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, [editingCustomerId]);
  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_customer/'+id)
    .then(result => {
        if(result.data.Status) {
            window.location.reload()
        } else {
            alert(result.data.Error)
        }
    })
  } 

  return (
    <Box m="20px">
      <Header
        title="CLIENTES"
        subtitle="Lista de clientes con un servicios activos"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .no-border-bottom": {
            borderBottom: "none !important",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          // rows={customer.map((e) => ( ))}
          getRowId={(row) => row.id}
          rows={customer}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
        {editingCustomerId !== null && (
        <EditCustomer
          customerId={editingCustomerId}
          onClose={() => setEditingCustomerId(null)} // Manejar el cierre del formulario
        />
      )}
      </Box>
    </Box>
  );
};

export default Contacts;
