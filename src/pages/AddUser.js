import React, { useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Alert, Button } from '@mui/material';
import { KeyboardArrowLeft, Send } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


// ------------------------------------------------------------------------------------------------------ MAIN COMPONENT -------------------------------------------------------
const AddUser = () => {

    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
    })
    const { name, email, password } = state;
    const handleInput = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value })
    }

// ---------------------------------------------------------------------------------------------------------POST DATA ---------------------------------------------------------

    const handleSubmit = e => {
        e.preventDefault();

        if (!name || !email || !password) {
            setError(true)
            setTimeout(() => {
                setError(null)
            }, 1500);
        }
        else {
            axios.post(`http://localhost:4500/users`, state)
                .then((resp) => {
                    // console.log(resp.status, resp.statusText)
                    if (resp.status === 201) {
                     // alert("data addes successfully")
                        setSuccess(true)
                    }
                    setTimeout(() => {
                        setSuccess(false)
                        navigate("/")
                    },500);
                    // console.log(resp.data)
                })
                .then(error => console.log(error))
        }
    }
// ----------------------------------------------------------------------------------------------------------inline css --------------------------------------------------------

const alertStyle = {
        position: "absolute", 
        top: "15%", 
        right: "5%", 
        width: "25%"
    }
// ------------------------------------------------------------------------------------------------------------- JSX ----------------------------------------------------------

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

        {success && <Alert variant="filled" severity="success" style={alertStyle}>
            Data Added Successfully 
        </Alert>}

        <h2>ADD -USER</h2>
        
{/* ------------------------------------------------------------------------------------------------------------ FORM ----------------------------------------------------- */}

        <form noValidate autoComplete='off' onSubmit={handleSubmit} >
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
                <TextField label="Password" color="secondary" name='password' value={password} onChange={handleInput} /> 
            </Box><br /> <br />
            <Button color='secondary'
                endIcon={<Send />}
                variant="contained"
                style={{ width: "150px" }}
                type='submit'
            >
                Submit
            </Button>
        </form>
    </div>
    );
}


export default AddUser