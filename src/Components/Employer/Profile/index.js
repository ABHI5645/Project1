import React, { useState,useEffect } from 'react'
import { Grid,Typography,TextField, Button,FormControl,Select,MenuItem} from '@mui/material'
import { addDoc, collection,doc, setDoc,getDoc} from "firebase/firestore"; 
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
function EmployerProfile(){
  const navigate=useNavigate();
  const[edit,setEdit]=useState(false);
  const[loading,setLoading]=useState(true);
  
  
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
  const saveInfo= async ()=>{
    try{
      await setDoc(
        doc(db,"userData",userData.uid),
        {  
          ...userInfo,
        },
        {merge:true}
      );
      alert("successfully updated");
      setEdit(false);
      
    }
    catch(err){
      console.log(err);
    }
  };
  
async function fetchUserInfo(){
  
  try{
  const docRef = doc(db, "userData", userData.uid);
const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    setUserInfo(docSnap.data());
    setLoading(false)
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    
  }
 } 
 catch(err){
  console.log(err)
}
}

 useEffect(()=>{
  fetchUserInfo()
 },[])
  
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
    <div>
   {
    loading?(<div> Loading... </div>):(
      <form> 
      <h1>Employer Profile</h1>
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
      disabled={!edit }
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
      disabled={true}
      type="email"
      variant='outlined' fullWidth
      value={userInfo.email}
      onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography  variant="h4">phone</Typography>
      <TextField 
      disabled={!edit}
      required type="number" variant='outlined' fullWidth
      value={userInfo.phone}
      onChange={(e)=>setUserInfo({...userInfo,phone:e.target.value})}
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">Company Name</Typography>
      <TextField 
      disabled={!edit}
      variant='outlined' required fullWidth 
      value={userInfo.companyName}
      onChange={(e)=>setUserInfo({...userInfo,companyName:e.target.value})} 
      ></TextField>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Typography variant="h4">Company Size</Typography>
      <TextField
      required
     disabled={!edit}
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
      disabled={!edit}
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
      disabled={!edit}
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
      disabled={!edit}
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
    {
            edit?(
              <div>
                <Button variant='contained' onClick={saveInfo}>Save</Button>
                
              
            <Button variant="contained" onClick={saveInfo}>Cancel</Button></div>
            ):(
              <Button variant="contained" onClick={()=>setEdit(true)}>Edit</Button>
            )
           }
    </Grid>
   </Grid>
   </form>
    )
  
   }
   </div>
 
  )
}        

export default EmployerProfile

