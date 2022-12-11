import { Button } from '@mui/material';
import React from 'react';
import {  signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {auth,db} from '../..//firebaseConfig';
import {useNavigate} from "react-router-dom"
import {doc, getDoc, setDoc } from "firebase/firestore"; 
import { async } from '@firebase/util';

function AuthPage({type}) {
  const navigate=useNavigate();
  const signIn=()=>{
  const provider=new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then(async(result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
   
    // The signed-in user info.
    const user = result.user;
    console.log(user)
    localStorage.setItem("user",JSON.stringify(user));
    const docRef = doc(db, "userData", user.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()){
      // navigate('/candidate/profile')
      const userInfo=docSnap.data();
      const userType=userInfo.type;
      localStorage.setItem('userinfo',JSON.stringify(userInfo))
      if(type==="candidate"){
        //navigate to candidate

            if(userType===type){
              
              
            
            navigate('/candidate/profile');
            }
            else{
              alert("you are already onboarded as employer")
              return;
            }
          
        }
        else{
          if(userType===type){
            navigate('/employer/profile');
          }
          //navigate to onboarding
          // navigate('/candidate/onboarding')
          else{
            alert("you are already onboarded as candidate");
            return;
          }
        }
        console.log("Document data:",docSnap.data());
      }
     else{
      if(type==="candidate"){
        navigate('/candidate/onboarding');
      }
      else{
        navigate('/employer/onboarding');
      }
      
     }
      
      
    
    
   
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  }
  return (
    <div>
      <h1>Welcome {type} please SignIn</h1>
      <h3>Signin with google  </h3>
      <Button onClick={signIn}>SignIn</Button>
    </div>
  )
}

export default AuthPage;

//onboarding when user is new
// profile we have user's data