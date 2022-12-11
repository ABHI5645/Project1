import { autocompleteClasses, Grid,Typography } from '@mui/material'
import logo1 from "../../assests/logo1.png"
import Card from "../common/Card"
import React from 'react'


const cards=[
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  },
  {
    title:"Marketing and Communication",
    availableJobs:100,
    img:logo1
  }
]
function Section2() {
  return (
    <Grid container>
      <Typography variant="h4" sx={{fontWeight:700,textAlign:"center"}}>
          One Platform
          Many Solutions
      </Typography>
      <Grid container
      sx={{
        margin:"auto",
        justifyContent:"center"

      }}
      
      >
        {
          cards.map((card,i)=>{
            return(
             <Card key={i}
             card={card}/>
            )
               
          })
        }
        
        
      </Grid>


    </Grid>
  )
}

export default Section2
