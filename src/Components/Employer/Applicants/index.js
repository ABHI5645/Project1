import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs,onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../../../firebaseConfig';
import CommonTable from '../../common/CommonTable';
import { doc, deleteDoc } from "firebase/firestore";
import { async } from '@firebase/util'; 
import {v4 as uuidv4} from "uuid"


const columnName = [
  {
    title:"Candidate Name",
    key:"candidate_name",
  },
  {
    title: "email",
    key: "candidate_email",

  },
  {
    title:"status",
    key:"status",
  },
  {
    title:"Job Title",
    key:"title",

  },
  {
    title:"actions",
    key:"buttons",
  }

 
 
  // {
  //   title: "applied on",
  //   key: "createdAt"
  // }
]
function CandidateApplication() {
  const userInfo=JSON.parse(localStorage.getItem("user"));
  const [allApplications,setAllApplications]=useState(null);
  const fetchData=async ()=>{
    const q=query(collection(db,'applications'),where("employerId",'==',userInfo.uid)) 
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data=[];
      querySnapshot.forEach((doc) => {
        console.log(doc.id,'=>',doc.data());
          data.push(doc.data());
    
      });
      setAllApplications(data);
      console.log("Current Jobs: ", data); 
    })
   
  }
  const handleClick=async (action,row)=>{
    const last_mesage_id=uuidv4();
    const oneToOneMessageId=uuidv4();
    if(action==="accept"){
      try{
        await setDoc(doc(db,"applications",row.applicationId),{
          status:"approved",
        },{   
          merge:true,
        });
      }
      catch(err){
        console.log(err)
      }
      // console.log('accept',row);
      try{
        console.log("row",row)
        await setDoc(doc(db,'last_messages',last_mesage_id),{
          last_message:`hey there we have accepted your application ${row.title}`,
          createdAt:new Date().getTime(),  
          employerId:row.employerId,
          candidateId:row.candidateId,
          jobId:row.jobId,
          applicationId:row.applicationId,
          last_message_id:last_mesage_id,
          candidate_name:row.candidate_name,
          employer_name:row.company_name,  
          conversationId:`${userInfo.uid}-${row.candidateId}`
        })
        await setDoc(doc(db,"one-to-one-messages",oneToOneMessageId),{
          createdAt:new Date().getTime(),   
          conversationId:`${userInfo.uid}-${row.candidateId}`,
          userId:userInfo.uid,
          userType:"employer",
          message:`hey there we have accepted your application  ${row.title}`,

        })
      }
      catch(err){
        console.log(err);
      }
      
    }
    else if(action==="rejected"){
      //application should be rejected
      await deleteDoc(doc(db, "applications", row.applicationId));

      console.log("reject",row);
    }
  }
  useEffect(()=>{
    fetchData();
  },[]);
  return (
    <div>
      
        {allApplications && allApplications.length>0?(
          <div><CommonTable data={allApplications}
          handleClick={handleClick}
          columnsName={columnName}/></div>
        ):allApplications && allApplications.length===0?(
          <div>no data</div>
        ):(
          <div>loading</div>

        )}
      
    </div>
  )
}

export default CandidateApplication
