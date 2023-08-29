import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import AccountForm from "../components/AccountForm";
import Header from "../components/Header";

export default function AccountPage(){
    const {data : session} = useSession();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');

    function saveChanges(){
        const data = {firstName,lastName,email,address,city,state,postalCode};
        axios.put('/api/userAccounts', data);
    }

    /*useEffect(() => {
        axios.get('/api/userAccounts').then(response => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setAddress(response.data.address);
            setCity(response.data.city);
            setState(response.data.state);
            setPostalCode(response.data.postalCode);
        });
    }, []);*/


    return(
            <>
            <Header />
            <div className="bg-fixed bg-center bg-cover custom-img">
                <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden h-screen">
                    <div className="h-screen bg-gradient-to-t from-indigo-100 to-gray mt-12 py-12 z-[10] md:ml-10 md:mr-10 z-[10] overflow-auto">
                        <div className="bg-white p-10 ml-10 mr-10 rounded-lg">
                            <h1 className="text-purple-900 text-lg">Hello, <b>{session?.user?.name}</b></h1>
                            <div className="border-b py-3 mb-4">
                                <h2 className="text-purple-900 font-bold text-3xl mt-10">Account Information</h2>
                                <p className="text-sm text-gray-400">Manage your account info</p>
                            </div>
                            <div className="grid md:grid-cols-2 w-full gap-4">
                                <input name="firstName" placeholder="First Name" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={firstName} onChange={ev => setFirstName(ev.target.value)}></input>
                                <input name="lastName" placeholder="Last Name" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={lastName} onChange={ev => setLastName(ev.target.value)}></input>
                            </div>
                            <input name="email" placeholder="Email" className="border w-full py-1 p-2 mt-2 mb-2" type="email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
                            <input name="address" placeholder="Street Address" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={address} onChange={ev => setAddress(ev.target.value)}></input>
                            <div className="grid sm:grid-cols-3 flex gap-2">
                                <input name="city" placeholder="City" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={city} onChange={ev => setCity(ev.target.value)}></input>
                                <input name="state" placeholder="State" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={state} onChange={ev => setState(ev.target.value)}></input>
                                <input name="postalCode" placeholder="Postal Code" className="border w-full py-1 p-2 mt-2 mb-2" type="number" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}></input>
                            </div>
                            <button className="p-2 bg-purple-900 text-white px-4 rounded-md mt-2 hover:bg-purple-100 hover:text-purple-900">Save changes</button>
                        </div> 
                    </div>
                </div>
            </div>
        </>
    )
}