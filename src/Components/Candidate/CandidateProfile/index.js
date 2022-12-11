import React, { useEffect,useState } from 'react'
import { Grid,Typography,TextField, Button,FormControl,Select,MenuItem,OutlinedInput,Box,Chip} from '@mui/material'
import { Theme,useTheme } from '@mui/material/styles';
import {doc, getDoc, setDoc } from "firebase/firestore"; 
import {db} from '../../../firebaseConfig';
import { async } from '@firebase/util';
const domains=[
  'Frontend',
   'Backend',
   'Fullstack',
   'Devops',
   'UI/UX',
   'QA',
   'Data Science',
   'Artificial Intelligence',
   'Cloud Computing',
   'Blockchain',
   'Software Engineering'
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


const skills = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Redux",
  "Node",
  "Express",
  "MongoDB",
  "SQL",
  "Python",
  "Java",
  "C++"
];
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
function CandidateProfile() {
  const userData=JSON.parse(localStorage.getItem('user'));
  const theme = useTheme();
  const[edit,setEdit]=useState(false);
  const [loading,setLoading]=useState(true);
  const [userInfo,setUserInfo]=React.useState({
    name:"",
    email:'',
    phone:'',
    skills:[],
    domain:"",
    address:""
  });
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
 const saveInfo=async()=>{
  try{
    await setDoc(doc(db,"userData",userData.uid),{
      ...userInfo,
      
    },{merge:true});
    alert("successfully updated")
    setEdit(false);
  }
  catch(err){
    console.log(err)
  }
 }
  return (
    <div>
      {
        loading?<div>Loading...</div>
        :
      <form>
        <h1>Profile</h1>
        <Grid container
          spacing={2}
          sx={{
            padding: "10px",
            maxWidth: "95%",
            margin: "20px auto",
            backgroundColor: "#fff",
            boxShadow: '0px 8px 24px rgba(0,0,0,0.15)',
            borderRadius: '8px'
          }}

        >
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Name</Typography>
            <TextField
            disabled={!edit}
              required
              variant='outlined' fullWidth
              value={userInfo.name}

              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">email</Typography>
            <TextField
              disabled
              required
              type="email"
              variant='outlined' fullWidth
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">phone</Typography>
            <TextField disabled={!edit} required type="number" variant='outlined' fullWidth
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Experience</Typography>
            <TextField variant='outlined'
            disabled={!edit}
            required fullWidth
              value={userInfo.experience}
              onChange={(e) => setUserInfo({ ...userInfo, experience: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h4">Education</Typography>
            <TextField variant='outlined'
            disabled={!edit}
            fullWidth
              value={userInfo.education}
              onChange={(e) => setUserInfo({ ...userInfo, education: e.target.value })}
            ></TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography

              variant="h4">Domain</Typography>
            <FormControl fullWidth>
              <Select
               required
               disabled={!edit}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={userInfo.domain}
                onChange={(e) => setUserInfo({ ...userInfo, domain: e.target.value })}
              >
                {
                  domains.map((domain, index) => {
                    return (
                      <MenuItem value={domain}>{domain}</MenuItem>
                    )
                  })
                }

              </Select>
            </FormControl>

          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography
            
              
              
              variant="h4">Skills</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>

              <Select
                disabled={!edit}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                
                multiple
                required
                value={userInfo.skills}
                onChange={handleSkillChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {skills.map((skill) => (
                  <MenuItem
                    key={skill}
                    value={skill}
                    style={getStyles(skill, userInfo.skills, theme)}
                  >
                    {skill}
                  </MenuItem>
                ))}
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
}
    </div>
  )
}

export default CandidateProfile
