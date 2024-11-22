import React,{useRef} from "react";
import {Link} from 'react-router-dom'
import ContactCard from './ContactCard'
const ContactList =(props)=>{

    const inputEL = useRef('')
    console.log(props)
    const deleteContactHandler=(id)=>{
        props.getcontactid(id);
    }
    const renderContactList = props.contacts.map((Val)=>{
         return (
    <ContactCard key={Val.id} contact={Val}  clickHandler={deleteContactHandler}/>  
         )
    })
    const getSearchTerm = ()=>{
        console.log(inputEL.current.value)
        props.searchKeyword(inputEL.current.value)
    }
    
    return (
        <>
        <h2> 
            Contact List 
            <Link to="/add" >
            <button className="ui button blue right">add Contact</button>
            </Link>
          
        </h2>
        <div className="ui search">
            <div className="ui icon input">
                <input type="text" ref={inputEL}
                placeholder="search contacts" className="promt" 
                value={props.term} 
                onChange={getSearchTerm} />
                <i className=" search icon"></i>
            </div>
        </div>
        <div className="ui celled list">
           {renderContactList.length > 0? renderContactList:"no contacts available"}  
        </div>
        </>
    )
}
export default ContactList;    