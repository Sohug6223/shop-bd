import { useState } from 'react';
import  { Outlet } from 'react-router-dom';
import Header from '../components/Header';


export default function MainLayout () {

        console.log('MainLayout rendered');

        const [searchTerm,setSearchTerm] = useState('');
    return (
        <>
         <Header
         
         searchTerm={searchTerm}
         setSearchTerm={setSearchTerm}
         />
         <Outlet context={{searchTerm}} />
        </>
    );
}
