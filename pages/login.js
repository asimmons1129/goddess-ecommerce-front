import axios from "axios";
import { useSession, signIn } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function LoginPage(){
    const {data: session} = useSession();
    const router = useRouter();

    useEffect(() => {
        if(session){
            router.push('/');
        }
    }, []);

    async function signin(){
        await signIn('google');
    }
    
    function goToHome(){
        router.push('/');
    }

        return (
            <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden"/>
                <div className="text-center z-[2] mt-[-10rem] flex flex-col">
                    <img src="goddess-logo.png" alt="" className="rounded-full"/>
                    <button onClick={signin} className="text-purple-100 px-8 py-2 border hover:bg-teal-400 hover:text-purple-800 mb-5 mt-5">Login with Google</button>
                    <button onClick={goToHome} className="text-purple-100 px-8 py-2 border hover:bg-teal-400 hover:text-purple-800">Back</button>
                </div>
            </div>
        );
}