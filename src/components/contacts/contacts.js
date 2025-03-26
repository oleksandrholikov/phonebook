import React from "react";
import "./contacts.css";
import  Contact from "../contact/contact";
import { useState } from "react";


function Contacts({ contacts }) {   
    
    let [startContact, setContact] = useState(contacts);        
    let [searchText, setSearchTxt] = useState(``);
    let [searchGender, setGender] = useState({ male: true, female: true, unknown: true});

    function handleSearchChange(event) {
        setSearchTxt(event.target.value);
        filter(event)
    }

    function handleCheckedChange(event) {
        setGender({ ...searchGender, [event.target.id]: event.target.checked })
        filterGender(event)
        
    }

    function getFilterGender(check, filterContacts) {
        let cheacked = [];
        let contactsList = filterContacts || contacts;
        console.log(searchGender)
        for (const key in check) {
            if (check[key] === true) {
                if (key === 'unknown') cheacked.push(undefined);
                cheacked.push(key)
            }
        }        
        return contactsList.filter((item) => {
            return (
                cheacked.includes(item.gender)
           )
        })
    }

    function getFilterContacts (searchText, filterContacts) {
        let contactsList = filterContacts || contacts;
        return contactsList.filter((item) => {
            return (
                item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
                item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phone.includes(searchText)
            );
        });
    }
    
   function filter(event){
    let filterContacts = getFilterContacts(event.target.value);
    setContact(filterContacts)
    }

    function filterGender(event) {
        let check = {...searchGender, [event.target.id]: event.target.checked};
        let filterContacts = getFilterGender(check);
        
        if (searchText.length > 0) {
            filterContacts = getFilterContacts(searchText, filterContacts)
            setContact(filterContacts)
        } else {
            setContact(filterContacts)
        }
    }

    return (<nav className='nav conteiner'>
        <input type="input" className='nav_input' value={searchText} onChange={handleSearchChange} placeholder="Search"></input>
        <div className="cheakbox">
            <label>Male<input type="checkbox" id="male" checked={searchGender.male} onChange={handleCheckedChange} /></label>
            <label>Female<input type="checkbox" id="female" checked={searchGender.female} onChange={handleCheckedChange}/></label>
            <label>Unknow<input type="checkbox" id="unknown"  checked={searchGender.unknown} onChange={handleCheckedChange}/></label>
        </div>
        <>
            {startContact.map(item =><Contact key ={item.id} user ={item}/>)}
        </>
      </nav>)
}

export default Contacts