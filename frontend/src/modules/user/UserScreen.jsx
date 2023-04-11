import React, { useState,useEffect } from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { ButtonCircle } from '../../shared/components/ButtonCircle'
import Loading from '../../shared/components/Loading'
import {FilterComponent} from '../../shared/components/FilterComponent'
import AxiosClient from '../../shared/plugins/axios'
import Alert, {
    confirmMsj, confirmTitle, errorMsj, errorTitle, successMsj, successTitle
} from '../../shared/plugins/alerts'
import UserForm from './components/UserForm'
import lego from '../../assets/lego.png'
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Button } from 'primereact/button';
        

const options = {
    rwsPerPageText: 'Registros por pagina',
    rangeSeparatorText: 'de',
}

const UserScreen = () => {
    const [usuarios, setusuarios] = useState([])
    const [selectedUsuarios, setselectedUsuarios] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [filterText, setFilterText] = useState("")
    const [isOpen, setIsOpen] = useState(false)

    const filteredUsuarios = usuarios.filter(
        usuarios => usuarios.name && usuarios.name.toLowerCase().includes(filterText.toLocaleLowerCase())
    )

    const getUsuarios = async() =>{
        try {  
            setIsLoading(false) 
            AxiosClient({ url: "/user" })
            .then((response) => setusuarios(response))
            .catch((error) => console.log(error));
        } catch (error) {
            setIsLoading(false)
        }
    }
    useEffect(()=>{
        getUsuarios();
    },[]);

    const enableOrDisable = (row) => {
        console.log('Row', row);
        Alert.fire({
            title: confirmTitle,
            text: confirmMsj,
            icon: 'warning',
            confirmButtonColor: '#009574',
            confirmButtonText: 'Aceptar',
            cancelButtonColor: '#DD6B55',
            cancelButtonText: 'Cancelar',
            reverseButtons: true,
            backdrop: true,
            showCancelButton: true,
            showLoaderOnConfirm: true,
            allowOutsideClick: () => !Alert.isLoading,
            preConfirm: async () => {
                row.status = !row.status
                console.log('Row', row);
                try {
                    const response = await AxiosClient({
                        method: 'PATCH',
                        url: `/user/${row._id}`,
                        data: JSON.stringify(row),
                    })
                    if (!response.error) {
                        Alert.fire({
                            title: successTitle,
                            text: successMsj,
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Aceptar'
                        })
                    }
                    console.log('response', response);
                    return response
                } catch (error) {
                    Alert.fire({
                        title: errorTitle,
                        text: errorMsj,
                        icon: 'error',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Aceptar'
                    })
                } finally {
                    getUsuarios()
                }
            }
        })
    }


    
    const headerComponent = React.useMemo(()=>{
        const handleClear = () =>{
            if(filterText) setFilterText('');
        };
        return(
            <FilterComponent
                onFilter={(e)=> setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        )
    },[filterText]);

    const columns = React.useMemo(()=> [
        {
            name:"#",
            cell: (row, index) => <div>{index+1}</div>,
            sortable:true,
        },{
            name:"Nombre Completo",
            cell: (row)=><div>{row.name} {row.surname}  {row.lastname}</div>,
            sortable:true,
            selector: (row) => row.name+row.surname+row.lastname
        },{
            name:"Correo Electrónico",
            cell: (row)=><div>{row.email}</div>,
            sortable:true,
            selector: (row) => row.email
        },
        {
            name:"Edad",
            cell: (row)=><div>{row.age}</div>,
            sortable:true,
            selector: (row) => row.age,
        },{
            name:"Estado",
            cell: (row) => row.status ? (<Badge bg="success">Activo</Badge>) : (<Badge bg="danger">Inactivo</Badge>),
            sortable:true,
            selector: (row) => row.status
        },{
            name:"Acciones",
            cell:(row)=> <>
                {
                    row.status ? ( <ButtonCircle 
                        icon='trash-2' 
                        type={"btn btn-outline-danger btn-circle"} 
                        onClick={()=>{
                            enableOrDisable(row)
                        }} 
                        size={16} />) :
                    (<ButtonCircle   icon='pocket' type={"btn btn-outline-success btn-circle"} onClick={()=>{enableOrDisable(row)}} size={16} />)
                }
            </>
            
        }
    ]);

  return <Card>
  <Card.Header>
      <Row>
        <Col><img src={lego} className="rounded me-2" width={50} /> </Col>
          <Col><h1>Usuarios</h1></Col>
          <Col className='text-end'>
              <ButtonCircle 
                  type={'btn btn-outline-success'}
                  icon='plus'
                  size={16}
                  onClick={()=>setIsOpen(true)}
              />
            <UserForm isOpen={isOpen} onclose={()=> setIsOpen(false) } setUsuarios={setusuarios} />
          </Col>
      </Row>
  </Card.Header>
  <Card.Body>
      <DataTable
          columns={columns}
          data={filteredUsuarios}
          progressPending={isLoading}
          progressComponent={<Loading/>}
          noDataComponent={'Sin registros'}
          pagination
          paginationComponentOptions={options}
          subHeader
          subHeaderComponent={headerComponent}
          persistTableHead
          striped={true}
          highlightOnHover={true}

      />
  </Card.Body>
</Card>
}

export default UserScreen