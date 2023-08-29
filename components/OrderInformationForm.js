import { useSession } from "next-auth/react";
import { useState } from "react";

export default function OrderInformationForm({
    _id,
    firstName:existingFirstName,
    lastName:existingLastName,
    email:existingEmail,
    address:existingAddress,
    city:existingCity,
    state:existingState,
    postalCode:existingPostalCode,
}){
    const {data: session} = useSession();
    const [firstName, setFirstName] = useState(existingFirstName || '');
    const [lastName, setLastName] = useState(existingLastName || '');
    const [email, setEmail] = useState(existingEmail || '');
    const [address, setAddress] = useState(existingAddress || '');
    const [city, setCity] = useState(existingCity || '');
    const [state, setState] = useState(existingState || '');
    const [postalCode, setPostalCode] = useState(existingPostalCode || '');

    return(
        <form>
        <div className="grid sm:grid-cols-2 flext gap-2 mt-4">
            <input name="firstName" type="text" placeholder="First Name" className="border w-full py-1 p-2 mt-2 mb-2" value={firstName} onChange={ev => setFirstName(ev.target.value)}/>
            <input name="lastName" type="text" placeholder="Last Name" className="border w-full py-1 p-2 mt-2 mb-2" value={lastName} onChange={ev => setLastName(ev.target.value)} />
        </div>
            <input name="email" type="email" placeholder="Email" className="border w-full py-1 p-2 mt-2 mb-2" value={email} onChange={ev => setEmail(ev.target.value)} />
            <input name="address" type="text" placeholder="Street Address" className="border w-full py-1 p-2 mt-2 mb-2" value={address} onChange={ev => setAddress(ev.target.value)} />
        <div className="grid sm:grid-cols-3 flext gap-2">
            <input name="city" type="text" placeholder="City" className="border w-full py-1 p-2 mt-2 mb-2" value={city} onChange={ev => setCity(ev.target.value)} />
            <input name="state" type="text" placeholder="State" className="border w-full py-1 p-2 mt-2 mb-2" value={state} onChange={ev => setState(ev.target.value)}/>
            <input name="postalCode" type="number" placeholder="Postal Code" className="border w-full py-1 p-2 mt-2 mb-2" value={postalCode} onChange={ev => setPostalCode(ev.target.value)}/>
        </div>
        </form>
            
    )
}