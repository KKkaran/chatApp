import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Header from "../Header"
import { Channel_Data,SEND_MESSAGE } from "../../utils/queries";
import { useParams } from "react-router-dom";
import Auth from "../../utils/Auth";


const Channel = ()=>{

    //useMutation to send message later
    const [sendMessageNow,{error:error2}] = useMutation(SEND_MESSAGE)
    //getting the channel id using useParams hook
    const channelId = useParams()
    //getting all the channel Data using channelId
    const {loading,error,data:data2} = useQuery(Channel_Data,{
        variables: {_id: channelId.channelId}
    })
    const data = data2?.channel || {}
    //storing logged in user's message using useState
    const [msg,setMsg] = useState({
        text:""
    })
    //calling the SendMessage when send button clicked
    const sendMessage = async(e)=>{
        e.preventDefault()
        setMsg({...msg,text:""})
        document.querySelector('#msginput').focus();
        
        //sending message to the backend!!
        try {
            const { data: data3 } = await sendMessageNow({
              variables: {_id:channelId.channelId,textValue:msg.text,senderId: {_id:Auth.getProfile().data._id}}
            });

            console.log(data3)
          } catch (e) {
            console.error(e);
          }
    }

    return(

        <>
            <Header/>
            <div className="container border border-dark p-3">
                {loading ? (
                    <h4>loading...</h4>
                ):(
                    data.messages.map(m=>{
                        return <>
                            {m.sender.username === Auth.getProfile().data.username ? (<p style={{textAlign:"right"}}>{m.textValue}</p>):(<p>{m.textValue}</p>)
                            }
                            </>
                    })
                )}

            <div className="container border border-dark">
                <form action="" className="row" onSubmit={sendMessage}>
                    <input type="text" id="msginput" className="col-12 col-sm-10 col-lg-11" value={msg.text} onChange={(e)=>
                        setMsg({...msg,text:e.target.value})
                    } autoFocus required placeholder="Message goes here.." />
                    <input type="submit" className="col-sm-2 col-lg-1" value={"SEND"} name="" id=""  />
                </form>
            </div>
            </div>

            
        </>
        
    )

}

export default Channel