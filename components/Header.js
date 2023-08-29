import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { CartContext } from "./CartContext";

export default function Header(){
    const {data: session} = useSession();
    const [navBar, setNavBar] = useState(false);
    const [open,setOpen] = useState(false);
    const [isSession, setIsSession] = useState(false);
    const [color, setColor] = useState('transparent');
    const [textColor, setTextColor] = useState('purple-100');
    const router = useRouter();
    const {pathname} = router;
    

    function goToAccount(){
        router.push('/account');
        setNavBar(!navBar);
    }

    const handleNav = () => {
        setNavBar(!navBar)
    }

    const logoutHandler = () =>{
        signOut();
        router.push('/');
    }
    console.log(isSession);

    useEffect(() => {
        const data = window.localStorage.getItem('accountImg');
        if(data !== null) {
            setIsSession(JSON.parse(data));
        }
    }, []);

    useEffect(() => {
        if(!session){
            setIsSession(false);
            window.localStorage.setItem('accountImg', JSON.stringify(isSession));
        } else {
            setIsSession(true);
            window.localStorage.setItem('accountImg', JSON.stringify(isSession));
        }
    }, [isSession]);

    useEffect(() => {
        const changeColor = () => {
            if (window.scrollY >= 90){
                setColor('#f3e8ff');
                setTextColor('#581c87');
            } else {
                setColor('transparent');
                setTextColor('#f3e8ff');
            }
        };
        window.addEventListener('scroll', changeColor);
    }, []);

    useEffect(() => {
        if(pathname.includes('/cart') || pathname.includes('/about') || pathname.includes('/products') || pathname.includes('/#products') || pathname.includes('/account')){
            setColor('#f3e8ff');
            setTextColor('#581c87');
        }
    }, []);

    const {cartProducts} = useContext(CartContext);

    function accountMenu(){
        if(!session){
            router.push('/login');
        } else{
            setOpen(!open);
        }
    }

    return (
        <div className="flex justify-between p-4 text-purple-100 fixed left-0 top-0 w-full z-10 ease-in duration-300 items-center" style={{backgroundColor: `${color}`}} >
            <nav style={{color: `${textColor}`}} className="flex justify-center items-center gap-1">
                <div className="md:hidden block z-10">
                    <button onClick={handleNav} className="hover:text-teal-400">
                        {navBar ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" style={{color: `${textColor}`}} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg> 
                        }
                    </button>
                </div>
                <Link href={'/'}  className="flex gap-1 md:gap-3 hover:text-teal-400 font-bold text-center">
                    <img src="/goddess-logo.png" alt="" className="rounded-full w-6 h-6" />
                    <h1 className="">Goddess Lashes by Iris</h1>
                </Link>
            </nav>
            <nav style={{color: `${textColor}`}} className="md:flex md:gap-4 hidden">
                <Link href={'/'} className="hover:text-teal-400">Home</Link>
                <Link href='/products' className="hover:text-teal-400">Products</Link>
                <Link href={'/about'} className="hover:text-teal-400">About</Link>
                <Link href={'/cart'} className="hover:text-teal-400 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    ({cartProducts.length})
                </Link>
                {isSession && (
                    <div className="text-left">
                        <button onClick={accountMenu} className="hover:text-teal-400">
                            <img src={session?.user?.image} alt="" className="w-6 h-6 rounded-full"/>
                        </button>
                            {
                                open && (
                                    <ul>
                                        <li>
                                            <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        </li>
                                        <li>
                                            <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                        </li>
                                    </ul>
                                    
                                )
                            }
                    </div>
                )}
                {!isSession && (
                    <div className="text-left">
                        <button onClick={accountMenu} className="hover:text-teal-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                            {
                                open && (
                                    <ul>
                                        <li>
                                            <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        </li>
                                        <li>
                                            <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                        </li>
                                    </ul>
                                    
                                )
                            }
                    </div>
                )}
            </nav>
            <div style={{color: `${textColor}`}} className="md:hidden flex justify-center items-center">
                <Link href={'/cart'} className="hover:text-teal-400 p-2 flex">
                    <   svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    ({cartProducts.length})
                </Link>
                {isSession && (
                    <div className="text-center items-center justify-center flex flex-col">
                        <button onClick={accountMenu} className="hover:text-teal-400 p-2 flex">
                            <img src={session?.user?.image} alt="" className="rounded-full w-6 h-6"/>
                        </button>
                        <div className="text-center">
                            {
                                open && (
                                    <div className="flex flex-col text-center">
                                        <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                {!isSession && (
                    <div className="text-center items-center justify-center flex flex-col">
                        <button onClick={accountMenu} className="hover:text-teal-400 p-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <div className="text-center">
                            {
                                open && (
                                    <div className="flex flex-col text-center">
                                        <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
            <div className={navBar ? "md:hidden absolute top-0 left-0 right-0 bottom-0 flex flex-col py-3 text-4xl justify-center items-center w-full h-screen bg-gradient-to-t from-indigo-300 to-indigo-950 text-center" : "md:hidden absolute top-0 left-[-100%] right-0 bottom-0 flex flex-col py-3 text-4xl justify-center items-center w-full h-screen bg-gradient-to-t from-purple-300 to-purple-900 text-center"}>
                <Link href={'/'} onClick={handleNav} className="hover:text-teal-400 p-2">Home</Link>
                <Link href='/products' onClick={handleNav} className="hover:text-teal-400 p-2">Products</Link>
                <Link href={'/about'} onClick={handleNav} className="hover:text-teal-400 p-2">About</Link>
                <Link href={'/cart'} onClick={handleNav} className="hover:text-teal-400 p-2 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>
                    ({cartProducts.length})
                </Link>
                {isSession && (
                    <div className="text-center items-center justify-center flex flex-col">
                        <button onClick={accountMenu} className="hover:text-teal-400 p-2 flex">
                            <img src={session?.user?.image} alt="" className="rounded-full w-10 h-10"/>
                        </button>
                        <div className="text-center">
                            {
                                open && (
                                    <div className="flex flex-col text-center">
                                        <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
                {!isSession && (
                    <div className="text-center items-center justify-center flex flex-col">
                        <button onClick={accountMenu} className="hover:text-teal-400 p-2 flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <div className="text-center">
                            {
                                open && (
                                    <div className="flex flex-col text-center">
                                        <button onClick={goToAccount} className="hover:text-teal-400">Manage Account</button>
                                        <button onClick={logoutHandler} className="hover:text-teal-400">Logout</button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}