import { useRouter, withRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AddIcon from '@mui/icons-material/Add'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CheckIcon from '@mui/icons-material/Check'
import CircularProgress from '@mui/material/CircularProgress'
import { DataGrid } from '@mui/x-data-grid'
import { userAcc } from '../../store/actions/userAcc'

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

export default function Dashboard(){
  const dispatch = useDispatch()
  const router = useRouter()

  const session = useSelector(state => state.userAcc.userAcc.session)
  const userEmail = useSelector(state => state.userAcc.userAcc.email)

  const columns = [
    { field: 'order_id', headerName: 'Order Id', width: 150 },
    { field: 'user_id', headerName: 'User Id', width: 300 },
    { field: 'consignee_name', headerName: 'Consignee Name', width: 180 },
    { field: 'consignee_number', headerName: 'Consignee Number', width: 230 },
    { field: 'consignee_email', headerName: 'Consignee Email', width: 280 },
    { field: 'consignee_address', headerName: 'Consignee Address', width: 350 },
    { field: 'consignee_country', headerName: 'Consignee Country', width: 250 },
    { field: 'consignee_state', headerName: 'Consignee State', width: 230 },
    { field: 'consignee_province', headerName: 'Consignee Province', width: 250 },
    { field: 'consignee_city', headerName: 'Consignee City', width: 250 },
    { field: 'consignee_postal', headerName: 'Consignee Postal Code', width: 220 },
    { field: 'length', headerName: 'Length', width: 150 },
    { field: 'width', headerName: 'Width', width: 150 },
    { field: 'height', headerName: 'Height', width: 150 },
    { field: 'weight', headerName: 'Weight', width: 150 },
    { field: 'payment_type', headerName: 'Payment Type', width: 200 },
    { field: 'pickup_contact_name', headerName: 'Pickup Contact Name', width: 250 },
    { field: 'pickup_contact_number', headerName: 'Pickup Contact Number', width: 250 },
    { field: 'pickup_address', headerName: 'Pickup Contact Address', width: 350 },
    { field: 'pickup_state', headerName: 'Pickup State', width: 230 },
    { field: 'pickup_country', headerName: 'Pickup Country', width: 250 },
    { field: 'pickup_province', headerName: 'Pickup Province', width: 250 },
    { field: 'pickup_city', headerName: 'Pickup City', width: 250 },
    { field: 'pickup_postal', headerName: 'Pickup Postal Code', width: 220 }
  ]

  const [arrData, setArrData] = useState([])
  const [input, setInput] = useState({
    'consName': '',
    'consNum': '',
    'consAddress': '',
    'consPostal': '',
    'consCountry': '',
    'consCity': '',
    'consState': '',
    'consProvince': '',
    'consEmail': '',
    'length': '',
    'width': '',
    'height': '',
    'weight': '',
    'paymentType': '',
    'pickName': '',
    'pickNumber': '',
    'pickAddress': '',
    'pickPostal': '',
    'pickCountry': '',
    'pickCity': '',
    'pickState': '',
    'pickProvince': ''
  })
  const {
    consName,
    consNum,
    consAddress,
    consPostal,
    consCountry,
    consCity,
    consState,
    consProvince,
    consEmail,
    length,
    width,
    height,
    weight,
    paymentType,
    pickName,
    pickNumber,
    pickAddress,
    pickPostal,
    pickCountry,
    pickCity,
    pickState,
    pickProvince
  } = input
  const [show, setShow] = useState(false)
  const [showModalItem, setShowModalItem] = useState(false)
  const [showPickupData, setShowPickupData] = useState(false)
  const [refreshData, setRefreshData] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleShow = () => setShow(true)
  const handleShowModalItem = () => {
    setShowModalItem(true)
    setShow(false)
  }
  const handleShowPickupData = () => {
    setShowPickupData(true)
    setShowModalItem(false)
  }
  const handleClose = () => setShow(false)
  const handleCloseModalItem = () => setShowModalItem(false)
  const handleClosePickupData = () => setShowPickupData(false)
  const handleBackToShow = () => {
    setShowModalItem(false)
    setShow(true)
  }
  const handleBackToModalItem = () => {
    setShowPickupData(false)
    setShowModalItem(true)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setInput(input => ({...input, [name]: value}))
  }

  useEffect(() => {
    const localSession = localStorage.getItem('session')
    const localUser = localStorage.getItem('email')
    if(session == undefined && localSession == undefined){
      router.push('/')
    }
    else if(session != undefined){
      localStorage.setItem("session", session)
      localStorage.setItem("email", userEmail)
      axios.get('https://frontend-screening-v1.herokuapp.com/order', {
        headers: {
          Authorization: session
        }
      })
      .then((res) => {
        setArrData(res.data.data)
        setRefreshData(false)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    }
    else{
      const reducers = {
        email: localUser,
        session: localSession
      }
      dispatch(userAcc(reducers))
      axios.get('https://frontend-screening-v1.herokuapp.com/order', {
        headers: {
          Authorization: localSession
        }
      })
      .then((res) => {
        setArrData(res.data.data)
        setRefreshData(false)
      })
      .catch((err) => {
        alert(err.response.data.message)
      })
    }
  }, [refreshData])

  const addData = () => {
    setLoading(true)
    const data = {
      "consignee_name": consName,
      "consignee_number": consNum,
      "consignee_address": consAddress,
      "consignee_postal": consPostal,
      "consignee_country": consCountry,
      "consignee_city": consCity,
      "consignee_state": consState,
      "consignee_province": consProvince,
      "consignee_email": consEmail,
      "length": parseInt(length),
      "width": parseInt(width),
      "height": parseInt(height),
      "weight": parseInt(weight),
      "payment_type": paymentType,
      "pickup_contact_name": pickName,
      "pickup_contact_number": pickNumber,
      "pickup_address": pickAddress,
      "pickup_postal": pickPostal,
      "pickup_country": pickCountry,
      "pickup_city": pickCity,
      "pickup_state": pickState,
      "pickup_province": pickProvince
    }
    axios.post('https://frontend-screening-v1.herokuapp.com/order', data, {
      headers: {
        'Authorization': session
      }
    })
    .then((res) => {
      setShowPickupData(false)
      setRefreshData(true)
      setLoading(false)
    })
    .catch((err) => {
      setLoading(false)
      alert(err.response.data.message)
    })
  }
  return(
    <div style={{ height: 400, width: '100%' }}>
      <Button variant="contained" startIcon={<AddIcon />} onClick={handleShow} >
        Add
      </Button>
      <DataGrid 
        rows={arrData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row.order_id}
      />
      <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Consignee Data
            </Typography>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea1"
                label="Consignee Name"
                placeholder="Name"
                name="consName"
                value={consName}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea2"
                label="Consignee Email"
                placeholder="Email"
                name="consEmail"
                value={consEmail}
              />
            </Stack>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea3"
                label="Consignee Number"
                placeholder="Number"
                name="consNum"
                value={consNum}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea9"
                label="Consignee Postal"
                placeholder="Postal Code"
                name="consPostal"
                value={consPostal}
              />
            </Stack>
            <TextField
              onChange={handleChange}
              id="outlined-textarea4"
              label="Consignee Address"
              placeholder="Address"
              multiline
              name="consAddress"
              value={consAddress}
            />
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea5"
                label="Consignee Country"
                placeholder="Country"
                name="consCountry"
                value={consCountry}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea6"
                label="Consignee State"
                placeholder="State"
                name="consState"
                value={consState}
              />
            </Stack>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea7"
                label="Consignee Province"
                placeholder="Province"
                name="consProvince"
                value={consProvince}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea8"
                label="Consignee City"
                placeholder="City"
                name="consCity"
                value={consCity}
              />
            </Stack>
            <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={handleShowModalItem} >
              Next
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={showModalItem}
        onClose={handleCloseModalItem}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack spacing={2}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Item Data
            </Typography>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="itemLength"
                label="Length"
                placeholder="Length"
                name="length"
                value={length}
              />
              <TextField
                onChange={handleChange}
                id="widthItem"
                label="Width"
                placeholder="Width"
                name="width"
                value={width}
              />
            </Stack>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="heightItem"
                label="Height"
                placeholder="Height"
                name="height"
                value={height}
              />
              <TextField
                onChange={handleChange}
                id="weightItem"
                label="Weight"
                placeholder="Weight"
                name="weight"
                value={weight}
              />
            </Stack>
            <TextField
              onChange={handleChange}
              id="Payment_type"
              label="Payment Type"
              placeholder="Payment Type"
              name="paymentType"
              value={paymentType}
            />
            <Stack direction="row" spacing={25} >
              <Button variant="contained" endIcon={<ArrowBackIosIcon />} onClick={handleBackToShow} color="error" >
                Back
              </Button>
              <Button variant="contained" endIcon={<ArrowForwardIosIcon />} onClick={handleShowPickupData} >
                Next
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
      <Modal
        open={showPickupData}
        onClose={loading ? '' : handleClosePickupData}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Stack spacing={2}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Pickup Data
        </Typography>
          <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea1"
                label="Pickup Contact Name"
                placeholder="Name"
                name="pickName"
                value={pickName}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea2"
                label="Pick Contact Number"
                placeholder="Contact Number"
                name="pickNumber"
                value={pickNumber}
              />
            </Stack>
            <TextField
              onChange={handleChange}
              id="outlined-textarea3"
              label="Pickup Address"
              placeholder="Address"
              name="pickAddress"
              value={pickAddress}
              multiline
            />
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea4"
                label="Pickup Country"
                placeholder="Country"
                name="pickCountry"
                value={pickCountry}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea6"
                label="Pickup State"
                placeholder="State"
                name="pickState"
                value={pickState}
              />
            </Stack>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea7"
                label="Pickup Province"
                placeholder="Province"
                name="pickProvince"
                value={pickProvince}
              />
              <TextField
                onChange={handleChange}
                id="outlined-textarea5"
                label="Pickup City"
                placeholder="City"
                name="pickCity"
                value={pickCity}
              />
            </Stack>
            <Stack direction="row" spacing={2} >
              <TextField
                onChange={handleChange}
                id="outlined-textarea9"
                label="Pickup Postal Code"
                placeholder="Postal Code"
                name="pickPostal"
                value={pickPostal}
              />
            </Stack>
            <Stack direction="row" spacing={25} >
              <Button variant="contained" startIcon={<ArrowBackIosIcon />} onClick={handleBackToModalItem} color="error" disable={loading} >
                Back
              </Button>
              <Button variant={loading ? "text" : "contained"} endIcon={loading ? '' : <CheckIcon />} onClick={addData} >
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
                    "Submit"
                }
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  )
}