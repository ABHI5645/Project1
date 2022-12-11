import React,{useState} from 'react'
import {Button, Grid} from '@mui/material';
import Jobform from './Jobform'
import Sidebar from './Sidebar'
function EmployerJobs() {
  const[mobileSidebar,setMobileSidebar]=useState(true);
  const[postAJob,setPostAJob]=useState(false);
  const[jobData,setJobData]=useState({
    title:"",
    description:"",
    location:"",
    salary:"",
    experience:"",
    skills:[],
    jobType:"",
    domain:"",

});
  const selectAJob=(data)=>{
    setMobileSidebar(false);
    if(!data){
      setJobData({
        title:"",
    description:"",
    location:"",
    salary:"",
    experience:"",
    skills:[],
    jobType:"",
    domain:"",
      })
      setPostAJob(true)
    }
    else{
      setJobData(data);
      setPostAJob(true);
    }
  }
  return (
    <>
    <Grid container
    spacing={2}
    >
      <Grid item xs={12} sm={3} 
       sx={{
        display:{xs:mobileSidebar?'block':"none",sm:"block"},
       }}
      
      >
        <Sidebar selectAJob={selectAJob}/>
      </Grid> 
      <Grid item xs={12} sm={9}
        sx={{
          display:{xs:mobileSidebar?'none':"block",sm:"block"}
        }}
      >
        <Button
        sx={{
          display:{xs:"block",sm:"none"}
        }}
        onClick={()=>setMobileSidebar(true)}
        >Back</Button>
        <Jobform postAJob={postAJob} jobData={jobData} setJobData={setJobData}/> 
      </Grid>
    </Grid>
    <Button onClick={()=>{
      setMobileSidebar(!mobileSidebar)
    }}>
      Switch 
    </Button>
    </>
  )
}

export default EmployerJobs
