import axios from "axios"
import Link from "next/link";
import { useState } from "react"
import { useEffect } from "react";
import { useContext } from "react";
import { mongooseConnect } from "../lib/mongoose";
import { Product } from "../models/Product";
import { CartContext } from "./CartContext";
import FlyingButton from 'react-flying-item';

export default function Products(){
    const {addProduct} = useContext(CartContext);
    const [products,setProducts] = useState([]);
    const length = products.length;
    const [current,setCurrent] = useState(0);
    
    useEffect(() => {
        axios.get('/api/products').then(response => {
            setProducts(response.data);
        });
    },[]);

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1);
      };
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current - 1);
    };
    
    if (!Array.isArray(products) || products.length <= 0) {
        return null;
    }

    return(
        <div className="bg-fixed bg-center bg-cover custom-img">
            <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden h-screen">
                <div id="products" className="h-screen bg-gradient-to-t from-indigo-100 to-gray mt-12 py-12 md:ml-10 md:mr-10 z-[10] overflow-auto" >
                    <h1 className="p-4 font-bold text-center text-4xl text-purple-300 py-12">Products</h1>
                    <hr className="w-6 h-1 mx-auto my-2 bg-teal-500 border-0 rounded"></hr>
                    <div className="flex relative justify-center items-center text-center flex-col mt-10">
                    {products.map((product) => {
                        return(
                        <div key={product._id} className={products.indexOf(product) === current ? 'opacity-[1] ease-in duration-1000' : 'opacity-0'}>
                                {products.indexOf(product) === current && (
                                <div className="flex sm:gap-4 gap-2 ml-4 mr-4">
                                    <button onClick={prevSlide}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-32 sm:h-32 w-10 h-10 text-gray-300 hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>
                                    <div className="flex flex-col gap-4">
                                        <Link href={'/products/'+product._id}>
                                            <img src={product.images[0]} alt="" className="w-200 h-200 p-4 shadow-md"/>
                                        </Link>
                                        <h2 className="font-bold text-3xl text-purple-600">{product.title}</h2>
                                        <div className="flex justify-between mb-10 md:px-10">
                                            <div className="justify-center">
                                                <p className="p-4 font-bold text-2xl">${product.price}</p>
                                            </div>
                                            <FlyingButton 
                                                src={product.images[0]} 
                                                targetTop={'5%'} 
                                                targetLeft={'95%'}
                                            >
                                                <div onClick={() => addProduct(product._id)} className="p-2 hover:bg-teal-400 hover:text-indigo-600 bg-indigo-600 text-white rounded-lg items-center justify-center text-center flex gap-2 mt-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                    </svg>
                                                    Add to cart
                                                </div>
                                            </FlyingButton>
                                        </div>
                                    </div>
                                    <button onClick={nextSlide}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="sm:w-32 sm:h-32 w-10 h-10 text-gray-300 hover:text-white">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </button>     
                                </div>
                            )}
                        </div>
                        );
                    })}
                    </div>
                </div>
            </div>
        </div>
    );
}

