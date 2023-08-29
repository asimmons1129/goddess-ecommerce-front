import axios from "axios";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { FaTable } from "react-icons/fa";
import { CartContext } from "./CartContext";
import Header from "./Header";
import OrderInformationForm from "./OrderInformationForm";

export default function CartPagelayout(){
    const {cartProducts, addProduct, removeProduct, ls} = useContext(CartContext);
    const {data: session} = useSession();
    const names = session?.user?.name.split(' ');
    const [products, setProducts] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    useEffect(() => {
        if(cartProducts.length > 0){
            axios.post('/api/cart', {ids:cartProducts}).then(response => {
                setProducts(response.data);
            })
        } else {
            clearCart();
        }
    }, [cartProducts]);

    useEffect(() => {
        if(session){
            setFirstName(names[0]);
            setLastName(names[1]);
        }
    }, []);

    useEffect(() => {
        if(typeof window === 'undefined'){
            return;
        }
        if(window?.location.href.includes('success')){
            setIsSuccess(true);
            clearCart();
        }
    }, []);

    function clearCart(){
        setProducts([]);
        ls.removeItem('cart');
    }

    function moreOfThisProduct(id){
        addProduct(id);
    }

    function lessOfThisProduct(id){
        removeProduct(id);
    }

    async function goToPayment(){
        const response = await axios.post('/api/checkout', {
            firstName,lastName,email,address,city,state,postalCode,cartProducts,
        });
        if(response.data.url){
            window.location = response.data.url;
        }
    }

    let total = 0;
    for(const productId of cartProducts){
        const price = products.find(p => p._id === productId)?.price || 0;
        total += price;
    }

    if(isSuccess){
        return(
            <>
                <Header />
                <div className="bg-gradient-to-t from-indigo-100 to-indigo-950 h-screen w-screen py-24">
                    <div className="grid md:grid-cols-2 overflow-hidden">
                        <div className="bg-white rounded-lg p-10 ml-10 mr-10 shadow-lg">
                            <h1 className="font-bold text-purple-900 text-4xl py-4">Thank you for your order goddess!</h1>
                            <p className="text-black text-xl py-4">A confirmation email will be sent to you.</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-60 h-60 mt-20 text-teal-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                            </svg>

                        </div>
                    </div>
                    
                </div>
            
            </>
        )
    }

    return(
        <div className="bg-fixed bg-center bg-cover custom-img">
            <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden h-screen">
                <div className="h-screen bg-gradient-to-t from-indigo-100 to-gray mt-12 py-4 md:py-12 z-[10] md:ml-10 md:mr-10 z-[10] overflow-auto">
                    <div className="flex p-10 grid md:grid-cols-2 gap-4 w-full py-24">
                        <label className="border p-8 py-10 items-center justify-center text-black rounded-md shadow-md bg-white">
                            <h1 className="font-bold text-2xl text-purple-900">Cart</h1>
                            {!cartProducts?.length && (
                                <div className="py-5">Your cart is empty!</div>
                            )}
                            {products?.length > 0 && (
                                <table className="w-full text-left mt-4">
                                    <thead>
                                        <tr className="text-gray-300 border-b">
                                            <th>Product</th>
                                            <th className="text-center">Quantity</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map(product => (
                                        <tr key={product._id}>
                                            <td className="max-w-[50px] max-h-[50px]">
                                                <img src={product.images[0]} alt="" className="rounded-lg shadow-lg mt-2 mb-2"/>
                                                {product.title}
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => lessOfThisProduct(product._id)} className="px-4 py-1 rounded-md bg-purple-100">-</button>
                                                <span className="px-3">
                                                    {cartProducts.filter(id => id === product._id).length}
                                                </span>
                                                <button onClick={() => moreOfThisProduct(product._id)} className="px-4 py-1 rounded-md bg-purple-100">+</button>
                                            </td>
                                            <td>${cartProducts.filter(id => id === product._id).length * product.price}</td>
                                        </tr>
                                        ))}
                                        <tr className="border-t">
                                            <td>
                                                <button onClick={clearCart} className="bg-red-600 p-1 rounded-lg text-white mt-1 hover:bg-red-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </td>
                                            <td></td>
                                            <td>${total}</td>
                                        </tr>
                                    </tbody>
                                    
                                </table>
                            )}
                        </label>
                        {!!cartProducts?.length && (
                            <div className="border p-8 py-10 items-center justify-center text-black rounded-md shadow-md bg-white">
                                <h1 className="font-bold text-2xl text-purple-900">Order Information</h1>
                                    <OrderInformationForm />
                                    <input type="hidden" value={cartProducts.join(',')} name="products"/>
                                    <button onClick={goToPayment} className="p-2 bg-purple-900 text-white px-4 rounded-md mt-2 hover:bg-purple-100 hover:text-purple-900">Continue to payment</button>
                            </div>
                        
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}