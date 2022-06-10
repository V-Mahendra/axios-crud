import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import { KeyboardArrowLeft, UpdateOutlined } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// ---------------------------------------------------------------------------------- MAIN COMPONENT ------------------------------------------------------------------

const EditUser = () => {

    const navigate = useNavigate()
    const params = useParams()
    // console.log(params.id)
    const [error, setError] = useState(false)
// ---------------------------------------------------------------------------------- variable declearation -------------------------------------------------------------
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = state;
    const handleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state,[name]:value })
    }
// ----------------------------------------------------------------------------------------- GET DATA -----------------------------------------------------------

    useEffect(() => {
        axios.get(`http://localhost:4500/users/${params.id}`)
            .then((resp) => {
                // console.log(resp.data)
                setState(resp.data)
            })
            .then(error => console.log(error))
    },[params])

// ---------------------------------------------------------------------------------------- UPDATE DATA --------------------------------------------------------

    const handleUpdate = (e) => {
        e.preventDefault();
        if (!name || !email || !password) {
            setError(true)
            setTimeout(() => {
                setError(null)
            },3000)
        }
        else {
            axios.put(`http://localhost:4500/users/${params.id}`, state)
                .then((resp) => {
                    // console.log(resp.status, resp.statusText)
                    navigate('/')
                }).then(error => console.log(error))
        }
    }
    // ------------------------------------------------------------------------------------- inline css -------------------------------------------------------------

    const alertStyle = {
        position: "absolute",
        top: "15%", 
        right: "5%", 
        width: "25%"
    }
// ------------------------------------------------------------------------------------------- JSX  ------------------------------------------------------------------

    return (<div style={{ marginTop: "13%" }}>
        <Button color='secondary'
            startIcon={<KeyboardArrowLeft />}
            variant="contained"
            style={{ position: "absolute", top: "7%", right: "5%", width: "130px" }}
            onClick={() => navigate('/')}
        >
            Go Back
        </Button>

        {error && <Alert variant="filled" severity="error" style={alertStyle}>
            Error alert — Please Fill all input fields!
        </Alert>}

        <h2>EDIT - USER</h2>
{/* -------------------------------------------------------------------------------------------- Form ------------------------------------------------------------- */}


        <form noValidate autoComplete='off' onSubmit={handleUpdate} >
            <Box
                // component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '45ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField label="Name" color="secondary" name='name' value={name} onChange={handleInput} />  <br />
                <TextField label="E-Mail" color="secondary" name='email' value={email} onChange={handleInput} /> <br />
                <TextField label="Password" color="secondary" name='password' value={password} onChange={handleInput} /> <br />
            </Box> <br /> <br />
            <Button color='secondary'
                endIcon={<UpdateOutlined />}
                variant="contained"
                style={{ width: "150px" }}
                type='submit'
            >
                Update
            </Button>
        </form>
    </div>
    );
}


export default EditUser;