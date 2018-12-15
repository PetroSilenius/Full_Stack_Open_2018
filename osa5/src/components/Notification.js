import React from 'react'

const Notification = props =>{
    if (props.message === null){
        return null
    }
    if (props.error){
        return <div className="error"> {props.message} </div>
    }
    return <div className="message"> {props.message} </div>
}

export default Notification