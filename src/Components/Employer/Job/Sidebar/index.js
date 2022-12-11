import React, { useEffect,useState } from 'react'
import { collection, query, where, onSnapshot } from "firebase/firestore";
import {Button, Grid} from "@mui/material"
import { async } from '@firebase/util';
import { db } from '../../../../firebaseConfig';
function Sidebar({selectAJob}) {
  const [allJobs,setAllJobs]=useState(null);
  const fetchJobs=async ()=>{
    const userInfo=JSON.parse(localStorage.getItem('user'))
    const employerId=userInfo.uid;
    try{
   const q=await query(collection(db,"jobsData"),where('employerId','==',employerId))
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const jobs = [];
  querySnapshot.forEach((doc) => {
    console.log(doc.id,'=>',doc.data());
      jobs.push(doc.data());

  });
  setAllJobs(jobs);
  console.log("Current Jobs: ", jobs);
});
  }
  catch(err){
    console.log(err);
  }
}
  useEffect(
    ()=>{
      fetchJobs();

    },[])
  return (
    <div>
      <Button onClick={()=>selectAJob()}  >Post a job</Button>
    {
    allJobs&&allJobs.length>0?(<div>
      {" "}
      
        {allJobs.map((job)=>{
          return(
            <Grid 
            onClick={()=>selectAJob(job)}
            key={job.Job_id}

            sx={{"padding":"10px","margin":"10px","border":"1px solid","borderRadius":"8px","fontSize":"16px"}}
            container>
              <Grid item xs={12}>
                {job.title}
              </Grid>
              <Grid item xs={12}>
                {job.location}
              </Grid>
              <Grid item xs={12}>
                {job.jobType}
              </Grid>
            </Grid>
          )
        

        })
      
      }
    
      </div>



    ):allJobs && allJobs.length===0?(<div>no data</div>):(<div>loading</div>)}
    </div>
  )
    }


export default Sidebar
