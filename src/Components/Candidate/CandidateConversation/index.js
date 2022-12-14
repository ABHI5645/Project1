import React,{useEffect, useState} from 'react'
import { collection, query, where, getDocs,onSnapshot, setDoc,doc, orderBy } from "firebase/firestore";
import LastMessages from '../../common/LastMessages'
import MessageArea from '../../common/MessageArea'
import { Button, Grid } from '@mui/material'
import {db} from "../../../firebaseConfig"
import {v4 as uuidv4} from "uuid"
function CandidateConversation() {
  const[lastMassageMobile,setLastMessageMobile]=useState(true);
  const[selectConversation,setSelectConversation]=useState(null);
  const[allLastMessages,setAllLastMessages]=useState(null);
  const[allConversations,setAllConversations]=useState(null);
  const userInfo=JSON.parse(localStorage.getItem("user"));
  const selectAConversation=async(data)=>{
    console.log(data);
    setSelectConversation(data);
    const q=query(
      collection(db,"one-to-one-messages"),where("conversationId","==",data.conversationId),
      // orderBy("createdAt","desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data=[];
      console.log(querySnapshot,"querySnapshot");
      querySnapshot.forEach((doc) => {
          data.push(doc.data());
      });
      setAllConversations(data);
      console.log("Current applications: ", data);
    });
    
    setLastMessageMobile(false);
  } 
  const postMessage=async(message)=>{
    const conversationId=selectConversation.conversationId;
    const oneToOneMessageId=uuidv4();
    try{
    await setDoc(doc(db,'last_messages',selectConversation.last_message_id),{
      last_message:message, 
      createdAt:new Date().getTime(), 
    },{
      merge:true
    })
    await setDoc(doc(db,'one-to-one-messages',oneToOneMessageId),{
      createdAt:new Date().getTime(), 
      conversationId:conversationId, 
      userId:userInfo.uid,
      userType:'candidate',
      message:message,

    }) 


  }
  catch(err){
    console.log(err)
  }     
}
  const fetchData=async ()=>{
    const q=query(collection(db,'last_messages'),where("candidateId","==",userInfo.uid)) 
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data=[];
      console.log(querySnapshot,"querySnapshot");
      querySnapshot.forEach((doc) => { 
       
          data.push(doc.data());
    
      });
      setAllLastMessages(data);
      console.log("all last messages: ", data); 
    })
   
  }
  useEffect(()=>{
    fetchData();
  },[])
  return (
   <Grid container>
    <Grid xs={12}
    sm={4}
    sx={{
      display:{xs:lastMassageMobile?"block":"none",sm:"block"}
    }}
    >
      <LastMessages allLastMessages={allLastMessages} selectAConversation={selectAConversation}/>
    </Grid>
    <Grid 
     xs={12}
    sm={8}
    sx={{
      display:{xs:lastMassageMobile?'none':'block',sm:"block"}
    }}
    >
     <Button
    onClick={()=>setLastMessageMobile(true)}
    >Back</Button>
     <MessageArea allConversations={allConversations}
     postMessage={postMessage}
     />
    </Grid>
    
   
   </Grid>
  ) 
}

export default CandidateConversation
