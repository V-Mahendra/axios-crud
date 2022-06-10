import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import axios from 'axios';
import { AddCircleOutline, Delete, EditSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// -----------------------------------------------------------------------------------MUI STYLE -------------------------------------------------------------------
const StyledTableCell = styled(TableCell)(({ theme }) => ({

    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// ---------------------------------------------------------------------------------- MAIN COMPONENT -------------------------------------------------------------
const UserData = () => {

    const navigate = useNavigate()
    const [userdata, setUserdata] = useState('')
    useEffect(() => {
        axios.get("http://localhost:4500/users").then((resp) => {
            setUserdata(resp.data)
        })
        .then(error => console.log(error))
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure want to delete ?")) {
            axios.delete(`http://localhost:4500/users/${id}`)
                .then((resp) => {
                    const newuserdata = userdata.filter((user) => {
                        return user.id !== id;
                    })
                    setUserdata(newuserdata)
                })
                .then(error => console.log(error))
        }
    }
    // ------------------------------------------------------------------------------------ INLINE CSS -------------------------------------------------------------
    const tableStyle = {
        width: "90%",
        position: "absolute",
        top: "15%",
        left: "5%"
    }
    const btnstyle = {
        width: "150px",
        marginTop: '60px'
    }
    // --------------------------------------------------------------------------------- JSX -----------------------------------------------------------------------

    return (<div>

        <Button color='secondary'
            startIcon={<AddCircleOutline />}
            variant="contained"
            style={btnstyle}
            onClick={() => navigate('/addUser')}
        >
            Add User
        </Button>

        <TableContainer component={Paper} style={tableStyle}>
            <h2>USER - DATA TABLE</h2>
            <Table sx={{ minWidth: 700 }} >
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell align="center">E-Mail</StyledTableCell>
                        <StyledTableCell align="center">Password</StyledTableCell>
                        <StyledTableCell align="center">Action</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {userdata && userdata.map((user) => (
                        <StyledTableRow key={user.id}>
                            <StyledTableCell component="th" scope="row">
                                {user.name}
                            </StyledTableCell>
                            <StyledTableCell align="center">{user.email}</StyledTableCell>
                            <StyledTableCell align="center">{user.password}</StyledTableCell>
                            <StyledTableCell align="center">
                                <ButtonGroup>
                                    <IconButton color='secondary' onClick={() => navigate(`/editUser/${user.id}`)}>{<EditSharp />}</IconButton>
                                    <IconButton color='error' onClick={() => handleDelete(user.id)}>{<Delete />}</IconButton>
                                </ButtonGroup>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
    );
}

export default UserData