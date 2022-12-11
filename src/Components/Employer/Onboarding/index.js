import React from 'react'
import { Grid,Typography,TextField, Button,FormControl,Select,MenuItem} from '@mui/material'
import { addDoc, collection,doc, setDoc } from "firebase/firestore"; 
import {db} from '../../../firebaseConfig';
import { useNavigate } from 'react-router-dom';



const industry=[
  'Agriculture',
  'Automotive',
  'Banking',
  'IT & Software',
  'Construction',

]
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};





function EmployerOnboarding(){
  const navigate=useNavigate();
  const userData=JSON.parse(localStorage.getItem("user"));
  const[userInfo,setUserInfo]=React.useState({
    name:"",
    email:userData?.email?userData.email:"",
    phone:"",
    
    companyName:"",
    size:"",
    hrEmailId:"",
    address:"",
    industry:""
  })
  const submitUserInfo=async(e)=>{
    e.preventDefault();
    try {
      await setDoc(doc(db, "userData", `${userData.uid}`), {
        ...userInfo,
        type:"employer",
      });
      alert('successfully submitted');
      navigate('/employer/profile');
    
     
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    console.log("submit",userInfo)
}
const handleSkillChange=(event)=>{
   const{
    target:{ value },
   }=event;
   setUserInfo(
    {
      ...userInfo,skills:typeof value=== 'string'?value.split(','):value,
    }
   )

}
  return (
    <form onSubmit={submitUserInfo}>
   <Grid container
   spacing={2}
   sx={{
    padding:"10px",
    maxWidth:"95%",
    margin:"20px auto",
    backgroundColor:"#fff",
    boxShadow:'0px 8px 24px rgba(0,0,0,0.15)',
    borderRadius:'8px'
   }}
   
   >
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">Name</Typography>
      <TextField 
      required
      variant='outlined' fullWidth
      value={userInfo.name}

      onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">email</Typography>
      <TextField
      required
      disabled
      type="email"
      variant='outlined' fullWidth
      value={userInfo.email}
      onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography  variant="h4">phone</Typography>
      <TextField required type="number" variant='outlined' fullWidth
      value={userInfo.phone}
      onChange={(e)=>setUserInfo({...userInfo,phone:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">Company Name</Typography>
      <TextField variant='outlined' required fullWidth 
      value={userInfo.companyName}
      onChange={(e)=>setUserInfo({...userInfo,companyName:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">Company Size</Typography>
      <TextField
      required
     
      variant='outlined' fullWidth
      value={userInfo.size}
      onChange={(e)=>setUserInfo({...userInfo,size:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography 
     
      variant="h4">HrEmailId</Typography>
      <FormControl fullWidth>
      <TextField
      required
      type="email"
      variant='outlined' fullWidth
      value={userInfo.hrEmailId}
      onChange={(e)=>setUserInfo({...userInfo,hrEmailId:e.target.value})}
      ></TextField>
 
   
 
  </FormControl>
        
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography 
      required
      variant="h4">Address</Typography>
     <TextField
      required
      
      variant='outlined' fullWidth
      value={userInfo.address}
      onChange={(e)=>setUserInfo({...userInfo,address:e.target.value})}
      ></TextField>
     
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography 
     
      variant="h4">Industry</Typography>
      <FormControl fullWidth>
      <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={userInfo.industry}
    onChange={(e)=>setUserInfo({...userInfo,industry:e.target.value})}
  >
    { 
       industry.map((ind,index)=>{
        return(
          <MenuItem value={index}>{ind}</MenuItem> 
        )
       })
    }
  
  </Select>
  </FormControl>
  </Grid>
  
    <Grid item xs={12} > 
      <Button type="submit">Submit</Button>
    </Grid>
   </Grid>
   </form>
 
  )
          }
export default EmployerOnboarding
//fields
//name
//email
//phone
//company name
//company website
//company size
//company address
//HR email id
//Industry
