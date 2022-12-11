import React,{useEffect,useState} from 'react';
import { collection, query, where, onSnapshot, QuerySnapshot, setDoc, setIndexConfiguration,doc, getDoc,getDocs } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import {v4 as uuidv4} from 'uuid';
import {Button, Grid} from "@mui/material";

function CandidateJobs(){
    const [allJobs,setAllJobs]=useState(null);
    const userInfo=JSON.parse(localStorage.getItem("user"));
    const fetchJobs=async ()=>{
        const candidateId=userInfo.uid;
        try{
            const q=await query(collection(db,"jobsData"))
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


    useEffect(()=>{
        fetchJobs();
    },[]);
    const applyForJob=async (job)=>{
        //applicationId
        //jobId
        //candidateId
        //status
        const applicationId=uuidv4(); 
        //console.log(job,'job')
        //fetch all aplications with candidate id
        //check if application already exists
        const q=await query(collection(db,'applications'),where("candidateId",'==',userInfo.uid)) 
        let data=[];
        const querySnapshot = await getDocs(q);
         querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
            console.log(doc.id,'=>',doc.data())
           data.push(doc.data());
        });
        console.log(data,"data");
        const isApplied=data.find((item)=>item.jobId===job.Job_id);
        console.log(isApplied,'isApplied')
        //check if this job>appliedcad have this candidate id
        //if yes then see the status
        //if status is applied then show a message that you have already applied for this job
        //if status is rejected then make it applied
        if(isApplied){
            alert("already applied");
            return;
        }
        else{
        try{
            await setDoc(doc(db,"applications",applicationId),{
                applicationId,
                jobId:job.Job_id,
                employerId:job.employerId,
                title:job.title,
                location:job.location,
                createdAt:new Date(),
                candidateId:userInfo.uid,
                status:'applied',
                candidate_name:userInfo.displayName,
                company_name:job.employer_name,
                candidate_email:userInfo.email,
                // candidate_experience:userInfo.experience

            });
            alert("applied successfully");
            
        }
        catch(err){
            console.log(err)
        }
    }
}
    return(
        <div>
          {
            allJobs && allJobs.length>0?(
                <div>{
                    allJobs.map((job)=>{
                        return(
                            <Grid
                            sx={{
                                maxWidth:"600px",
                                width:"90%",
                                margin:"auto",
                                padding:"10px",
                                alignItems:"center",
                                display:"flex",
                                flexDirection:"column",
                                boxShadow:"0px 4px 8px rgba(0,0,0,0.2)",
                                borderRadius:"10px",
                            }}
                            
                            
                            
                            
                            
                            
                            container>
                                <Grid item xs={12}>
                                    {job.title}
                                </Grid>
                                <Grid item xs={12}>
                                    {job.location}
                                </Grid>
                                <Grid item xs={12}>
                                    {job.description}
                                </Grid>
                                <Grid item xs={12}>
                                    <label>Skills</label>
                                    <div style={{display:"flex",gap:"10px"}}>
                                        {
                                            job.skills.map((skill)=>{
                                                return(
                                                    <div>
                                                        {skill}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                <Button onClick={()=>applyForJob(job )} variant="contained">
                                    Apply
                                </Button>
                            </Grid>
                            </Grid>
                            
                        )
                    })
                }</div>
            ):allJobs && allJobs.length===0?(
                <div>no data</div>
            ):(<div>no loading</div>
          )}
        </div>
            
    )
        }
export default CandidateJobs;