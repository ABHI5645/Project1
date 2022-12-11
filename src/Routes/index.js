//landing page "/"
//auth page "/auth"
//{
//company onboarding page "/candidateonboarding"
//employe onboardingpage "/employerOnboarding"
//candidateProfile page "/candidateProfile"
//employerJobs "/employerJobs"
//candidateJobs "/candidateJobs"
//application page "/application"
//applicants page "/applicants"
//employerConversation page "/employerConversation"
//candidateConversation page "/candidateConversation"
//}


import React from "react";
import {Routes,Route, Navigate,Outlet} from "react-router-dom"
import LandingPage from "../Components/LandingPage";
import AuthPage from "../Components/AuthPage";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import CandidateApplication from "../Components/Candidate/Applications";
import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerJobs from "../Components/Employer/Job";
import EmployerConversation from "../Components/Employer/Conversation";
import EmployerApplication from "../Components/Employer/Applicants";
import CandidateHoc from "../Components/HOC/CandidateHoc";
import EmployerHoc from "../Components/HOC/EmployerHoc";

function Nav(){
    const user=JSON.parse(localStorage.getItem("user"))||null;
    const userinfo=JSON.parse(localStorage.getItem('userinfo'))||null;
    const CandidateProtactedRoutes=()=>{
        if(user&&userinfo?.type==='candidate')
        // if(user)
        {
            return <Outlet/>
        }
        else{ 
            return <Navigate to='/'/>
      
        }
    }
    const EmployerProtectedRoute=()=>{ 
        // if(user)
        if(user&&userinfo?.type==='employer')
        {
            return <Outlet/>
        }
        else{
            return <Navigate to='/'/>
      
        }
    }
    return(
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/candidate/auth" element={<AuthPage type='candidate'/>}/>
            <Route path="/employer/auth" element={<AuthPage type='employer'/>}/>


            <Route path="/candidate/onboarding" element={<CandidateOnboarding/>}/>
            <Route element={<CandidateProtactedRoutes/>}>
            
            <Route path="candidate/profile" element={<CandidateHoc><CandidateProfile/></CandidateHoc>}/>
            <Route path="candidate/jobs" element={<CandidateHoc><CandidateJobs/></CandidateHoc>}/>
            <Route path="candidate/conversation" element={<CandidateHoc><CandidateConversation/></CandidateHoc>}/>
            <Route path="candidate/application" element={<CandidateHoc><CandidateApplication/></CandidateHoc>}/>
            </Route>
            <Route path="/employer/onboarding" element={<EmployerOnboarding/>}/>
            <Route element={<EmployerProtectedRoute/>}>
            
            <Route path='employer/profile' element={<EmployerHoc><EmployerProfile/></EmployerHoc>}/>
            <Route path='employer/jobs' element={<EmployerHoc><EmployerJobs/></EmployerHoc>}/>
            <Route path="employer/conversation" element={<EmployerHoc><EmployerConversation/></EmployerHoc>}/>
            <Route path="employer/applicants" element={<EmployerHoc><EmployerApplication/></EmployerHoc>}/>
            </Route>
        </Routes>
    )
}
export default Nav;