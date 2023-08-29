import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function AccountForm({
    _id,
    firstName:existingFirstName,
    lastName:existingLastName,
    email:existingEmail,
    address:existingAddress,
    city:existingCity,
    state:existingState,
    postalCode:existingPostalCode,
}){
    const {data : session} = useSession();
    const [firstName, setFirstName] = useState(existingFirstName || '');
    const [lastName, setLastName] = useState(existingLastName || '');
    const [email,setEmail] = useState(existingEmail || session?.user?.email);
    const [address, setAddress] = useState(existingAddress || '');
    const [city, setCity] = useState(existingCity || '');
    const [state, setState] = useState(existingState ||'');
    const [postalCode, setPostalCode] = useState(existingPostalCode || '');
    const [isSuccessVisible, setIsSuccessVisible] = useState(false);

    async function saveAccount(ev){
        ev.preventDefault();
        const data = {firstName,lastName,email,address,city,state,postalCode};
        if(_id){
            await axios.put('/api/userAccounts', {...data,_id});
        } else {
            await axios.post('/api/userAccounts', {...data});
        }
        setIsSuccessVisible(true);
        setTimeout(() => {
            setIsSuccessVisible(false);
        }, 3000);
    }

    return(
          <form>
              {isSuccessVisible && (
                  <div className="py-2 p-2 text-purple-900 bg-purple-100 mb-10 fade-out-style">Changes saved successfully</div>
              )}
              <div className="grid md:grid-cols-2 w-full gap-4">
                    <input name="firstName" placeholder="First Name" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={firstName} onChange={ev => setFirstName(ev.target.value)}></input>
                    <input name="lastName" placeholder="Last Name" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={lastName} onChange={ev => setLastName(ev.target.value)}></input>
                </div>
                <input name="email" disabled={true} placeholder="Email" className="border w-full py-1 p-2 mt-2 mb-2" type="email" value={email} onChange={ev => setEmail(ev.target.value)}></input>
                <input name="address" placeholder="Street Address" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={address} onChange={ev => setAddress(ev.target.value)}></input>
                <div className="grid sm:grid-cols-3 flext gap-2">
                    <input name="city" placeholder="City" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={city} onChange={ev => setCity(ev.target.value)}></input>
                    <input name="state" placeholder="State" className="border w-full py-1 p-2 mt-2 mb-2" type="text" value={state} onChange={ev => setState(ev.target.value)}></input>
                    <input name="postalCode" placeholder="Postal Code" className="border w-full py-1 p-2 mt-2 mb-2" type="number" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}></input>
                </div>
                <button onClick={saveAccount} className="p-2 bg-purple-900 text-white px-4 rounded-md mt-2 hover:bg-purple-100 hover:text-purple-900">Save changes</button>
          </form>
                    
    )
}