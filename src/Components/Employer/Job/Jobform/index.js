import { useTheme } from '@emotion/react';
import { Grid,TextField,FormControl,Typography,Box,Chip,MenuItem ,Select,OutlinedInput,Button,InputLabel} from '@mui/material'
import { v4 as uuidv4 } from 'uuid';
import { setDoc,doc,addDoc,collection,getFirestore } from 'firebase/firestore';

import React, { useState } from 'react'
import { db } from '../../../../firebaseConfig';
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
  function getStyles(name,personName, theme) {
    return {
      fontWeight:
        personName?.indexOf(name) === -1
          ? theme?.typography?.fontWeightRegular
          : theme?.typography?.fontWeightMedium,
    };
  }






function Jobform({postAJob,jobData,setJobData}) {
    const userInfo=JSON.parse(localStorage.getItem('user'))
    const theme = useTheme();
    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setJobData(
          // On autofill we get a stringified value.
          {...jobData,
            skills:typeof value==='string'?value.split(','):value,
          });
      };
   
   
     const submitJob=async(e)=>{
       //generate a job id
       //create a collection in firestore
       e.preventDefault();
       const Job_id=uuidv4();
       try{ 
        if(jobData.Job_id){ //update
            await setDoc(doc(db,"jobsData",jobData.Job_id),{
                ...jobData,
            })
        }
        else{//create
       await setDoc(doc(db,"jobsData",Job_id),{
        Job_id:Job_id,
        ...jobData,
       
        employerId:userInfo.uid,
        createdAt:new Date(),
        employer_name:userInfo.displayName,
       });
    }
       alert("Job posted successfully")
     }
     catch(err){
        console.log(err)
     }
    }
       

  return (
    (
    postAJob?(
    <form onSubmit={(e)=>submitJob(e)}>
    <Grid container spacing={2}>
        <Grid item xs={12}>
            <h1>Job Form</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
        <label>Job Title</label>  
        <TextField required value={jobData.title}
            onChange={(e)=>setJobData({...jobData,title:e.target.value})}
            fullWidth
            />
           
        </Grid> 
        <Grid item xs={12} sm={6}>
        <label>location</label>
        <TextField required value={jobData.location} onChange={(e)=>{
            setJobData({...jobData,location:e.target.value})
            
        }}
        fullWidth
       
        
        />
        </Grid>
        <Grid item xs={12} sm={6}>
            <label>Salary</label>
            <TextField required value={jobData.salary} onChange={(e)=>{
                setJobData({...jobData,salary:e.target.value})
            }}
            fullWidth
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <label>Experience</label>
            <TextField required value={jobData.experience} onChange={
                (e)=>{
                    setJobData({...jobData,experience:e.target.value})
                }
            }
            fullWidth
            />
        
        </Grid>
        
        <Grid item xs={12} sm={6}>
            <label>Job Type</label>
            <TextField required value={jobData.jobType} onChange={(e)=>
                setJobData({...jobData,jobType:e.target.value})}
                fullWidth/>
            
        </Grid>
        <Grid item xs={12} sm={12}>
            <label>Description</label>
            <TextField 
            required
            multiline
            rows={4}
            value={jobData.description} onChange={
                (e)=>setJobData({...jobData,description:e.target.value})}
            fullWidth
           
            />
        </Grid>
        <Grid item xs={12} sm={6}>
            <Typography

              variant="h4">Domain</Typography>
            <FormControl fullWidth>
              <Select
               required
              // disabled={!edit}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={jobData.domain}
                onChange={(e)=>setJobData({...jobData,domain:e.target.value})}
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
          <FormControl>
       
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={jobData.skills}
          onChange={handleChange}
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
          {skills.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, jobData.skills, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
          </Grid>

          {/* <Grid item xs={12} sm={6}>
            <Typography
            
              
              
              variant="h4">Skills</Typography>
            <FormControl sx={{ m: 1, width: 300 }}>

              <Select
                //disabled={!edit}
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                
                multiple
                required
                value={jobData.skills}
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
                    style={getStyles(skill, jobData.skills, theme)}
                  >
                    {skill}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> */}
          {/* <Grid item xs={12} sm={6}>
      <Typography 
      required
      variant="h4">Skills</Typography>
      <FormControl sx={{ m: 1, width: 300 }}>
      
        <Select
          
          id="demo-multiple-chip"
          multiple
          required
          value={jobData.skills} 
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
              style={getStyles(skill, jobData.skills, theme)}
            >
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid> */}
   
    <Grid item xs={12} sm={12}>
    <Button type="submit" variant="contained" color="primary">
        Submit
    </Button>
    </Grid> 


    </Grid>
    </form>):(<div>please select a job</div>)
  )
  )
}

export default  Jobform
