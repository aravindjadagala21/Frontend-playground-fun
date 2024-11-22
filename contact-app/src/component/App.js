import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { nanoid } from 'nanoid';
// import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import ContactDetail from './ContactDetail';
import api from '../api/contacts'
import EditContact from './EditContacts'

export default function App() {

  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("")
  const [searchResult,setSearchResult]= useState([])
  const retriveContacts= async ()=>{
    const response = await api.get('/contacts');
    return response.data;
    
  }

  const addContactHandler = async (contact) => {
    const request = {
      id: nanoid(),
      ...contact
    }
    const response = await api.post("/contacts",request)
    setContacts([...contacts, response.data]);
  };
const updateContactHandler =async (contact)=>{
  console.log(contact)
const response = await api.put(`/contacts/${contact.id}`,contact)
// console.log(response.data) 
}
const searchHandler=(searchTerm)=>{
setSearchTerm(searchTerm);
if(searchTerm !==""){
  const newContactList = contacts.filter((contact)=>{
    return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
    
  })
  setSearchResult(newContactList);

}
else {
  setSearchResult(contacts);
}
}


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };

  useEffect(() => {
    const getAllContacts = async ()=>{
      const allContacts = await retriveContacts();
      if(allContacts) setContacts(allContacts);
     } 

    getAllContacts();
  }, []);

  useEffect(() => {
  
  },
   [contacts]);

  return (
    <>
   <Router>
  <Routes>
    <Route 
      path="/add" 
      element={<AddContact addContactHandler={addContactHandler} />} 
    />
     <Route 
      path="/edit" 
      element={<EditContact updateContactHandler={updateContactHandler} />} 
    />
    <Route 
      path="/" 
      element={<ContactList contacts={searchResult.length<1 ?contacts:searchResult}
       getcontactid={removeContactHandler}
        term ={searchTerm} searchKeyword={searchHandler} />} 
    />
    <Route path="contact/:id" 
    element ={<ContactDetail/>}/>
    
  </Routes>
</Router>
{/* <EditContact/> */}


    {/* <Header/>
 <AddContact addContactHandler ={addContactHandler}/>
<ContactList contacts={contacts} getcontactid={removeContactHandler}/>   */}
</>
  );
}


