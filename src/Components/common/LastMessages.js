import React from 'react'
import {Grid} from "@mui/material"


const mock=[
    {
        id:1,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    },
    {
        id:2,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    },
    {
        id:19,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    },
    {
        id:29,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    },
    {
        id:1890,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    },
    {
        id:209,
        name:"John Doe",
        lastMessage:"Hello,I am John Doe",
        time:"12:00 PM",
    }
  
    
]

function LastMessages(
   {
    allLastMessages,selectAConversation,
   }
) {
  return (
    <div>
        {/* {
            mock.map((item)=>{
                return <Grid
                onClick={()=>selectAConversation(item)}
                container 
                sx={{
                    padding:"10px",
                    margin:"10px",
                    textAlign:"left"
                }}
                xs={12} key={item.id}>
                    <Grid item xs={9}>{item.name}</Grid>
                    <Grid item xs={3}>{item.time}</Grid>
                    <Grid item xs={12}>{item.lastMessage}</Grid>
                    
                    

                    </Grid>
            })
        } */}
        {
            allLastMessages &&  allLastMessages.length > 0 ? (
                <div>
                    {allLastMessages.map((item)=>{
                        return(
                            <Grid onClick={()=>selectAConversation(item)}
                            sx={{
                                padding:"10px",
                                margin:"10px",
                                textAlign:"left",
                            }}
                            container
                            key={item.last_message_id}
                            >
                                <Grid item xs={9}>
                                    {item.candidate_name}
                                </Grid>
                                <Grid item xs={3}>
                                    {"item.createdAt"}

                                </Grid>
                                <Grid item xs={12}>
                                    {item.last_message}
                                </Grid>
                            </Grid>
                        )
                    })}













                </div>
            ): allLastMessages && allLastMessages.length===0?(
                <div>no data</div>
            ):(
                <div>loading</div>
            )
        }

    </div>
  )
  
}

export default LastMessages
