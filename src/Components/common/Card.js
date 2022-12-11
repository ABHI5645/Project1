import React from 'react'
import { Grid ,Typography} from '@mui/material'
function Card({card}) {
  return (
    
       <Grid item xs={6}
              md={2.5}
              lg={2.5}
              sx={{
               
                display:"flex",
                background: "#FFFFFF",
                boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.25)",
                borderRadius: "20px",
                margin:"10px",
                padding:"20px 30px"
              }}
              >
               
              
            
                <div>
                  <img style={{height:"45px",width:"45px"}} src={card.img} alt="img1"/>
                </div>
                <div>
                  <Typography variant="h6">{card.title}</Typography>
                  <Typography variant="h6">{card.availableJobs} Jobs available</Typography>
                </div>
              </Grid>
  
  )
}

export default Card

