import React, { useState } from 'react'
import { useRouter, withRouter } from 'next/router'
import Box from '@mui/material/Box'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Avatar from '@mui/material/Avatar'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import LockIcon from '@mui/icons-material/Lock'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { userAcc } from '../store/actions/userAcc'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const Home = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const [input, setInput] = useState({
    'email': '',
    'password': ''
  })
  const {
    email,
    password
  } = input
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(input => ({...input, [name]: value}))
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const handleCloseErrorModal = () => setErrorModal(false)

  const submitData = () => {
    setLoading(true)
    const data = {
      'email': email,
      'password': password
    }
    axios.post('https://frontend-screening-v1.herokuapp.com/login', data)
    .then((res) => {
      dispatch(userAcc(res.data.data))
      router.push('/dashboard')
      setLoading(false)
    })
    .catch((err) => {
      console.log(err.response)
      setLoading(false)
      setErrorModal(true)
      setErrorMsg(err.response.data.message)
    })
  }
  return (
    <Box
      sx={{
        width: 450,
        height: 450,
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%',
        border: 3,
        borderRadius: 8
      }}
    >
      <Avatar sx={{
        width: 75, 
        height: 75, 
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%'
      }}>
        <AccountCircleIcon sx={{
          width: 75, 
          height: 75,
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}/>
      </Avatar>
      <p style={{textAlign: 'center', fontSize: '20px', fontWeight: 'bold'}}>
        LOGIN
      </p>
      <div style={{
        margin: 'auto',
        width: '50%',
        padding: '10px'
      }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">
            Email
          </InputLabel>
          <Input
            id="input-with-icon-adornment"
            name="email"
            value={email}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  edge="end"
                  sx={{visibility: 'hidden'}}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
      <div style={{
        margin: 'auto',
        width: '50%',
        padding: '10px'
      }}>
        <FormControl variant="standard">
          <InputLabel htmlFor="input-with-icon-adornment">Password</InputLabel>
          <Input
            id="input-with-icon-adornment"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handleChange}
            startAdornment={
              <InputAdornment position="starts">
                <LockIcon />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
      </div>
      <div style={{
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '25%',
        padding: '10px',
      }}>
        <Button variant={loading ? "text" : "contained"} onClick={submitData}>
          {
            loading ? 
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
              :
              "LOGIN"
          }
        </Button>
      </div>
      <Modal
        open={errorModal}
        onClose={handleCloseErrorModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack spacing={2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {errorMsg}
          </Typography>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default withRouter(Home)