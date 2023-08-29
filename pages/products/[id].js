import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";
import Header from "../../components/Header";
import FlyingButton from 'react-flying-item';

export default function ProductPage(){
    const {addProduct, isAddedToCart} = useContext(CartContext);
    const [product, setProduct] = useState(null);
    const router = useRouter();
    const {id} = router.query;
    useEffect(() => {
        if(!id){
            return;
        }
        axios.get('/api/products?id='+id).then(response => {
            setProduct(response.data);
            console.log(response.data);
        });
    }, [id]);

    function goBack(){
        router.push('/products');
    }

    return(
        <>
            <Header />
            <div className="bg-fixed bg-center bg-cover custom-img">
                <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden h-screen">
                    <div className="h-screen bg-gradient-to-t from-indigo-100 to-gray mt-12 py-12 z-[10] md:ml-10 md:mr-10 z-[10] overflow-auto">
                        {product && (
                            <div className="flex grid md:grid-cols-2 w-full p-5 py-24 gap-4">
                                <div className="p-10">
                                    <img src={...product.images[0]} alt="" className="mb-4 rounded-xl"/>
                                    <div className="flex grid w-full grid-cols-3 gap-2">
                                        <img src={...product.images[0]} alt="" className="rounded-xl w-[150px] l-[150px]"/>
                                        <img src={...product.images[1]} alt="" className="rounded-xl w-[150px] l-[150px]"/>
                                        <img src={...product.images[2]} alt="" className="rounded-xl w-[150px] l-[150px]"/>
                                    </div>
                                </div>
                                <div className="p-10">
                                    <h2 className="text-4xl font-bold text-purple-300 pb-10">{...product.title}</h2>
                                    <p className="text-2xl text-gray-200 mb-10">{...product.description}</p>
                                    <div className="flex gap-2">
                                        <FlyingButton 
                                            src={product.images[0]} 
                                            targetTop={'5%'} 
                                            targetLeft={'95%'}
                                        >
                                            <div onClick={() => addProduct(product._id)} className="p-2 hover:bg-teal-400 hover:text-indigo-600 bg-indigo-600 text-white rounded-lg items-center justify-center text-center flex gap-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                                </svg>
                                                Add to cart
                                            </div>
                                        </FlyingButton>
                                        <div>
                                            <button onClick={goBack} className="p-2 bg-indigo-600 text-white hover:bg-teal-400 shadow-lg rounded-lg">
                                                Back
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}