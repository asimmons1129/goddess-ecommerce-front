import Link from 'next/link';
import React from 'react';

const Hero = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-fixed bg-center bg-cover custom-img">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden"/>
            <div className="text-purple-100 text-center z-[2] mt-[-10rem]">
                <h2 className="text-5xl font-bold">Goddess Lashes by Iris</h2>
                <p className="py-5 text-xl text-teal-500">Which Goddess are you?</p>
                <Link href={'/#products'} className="px-8 py-2 border hover:bg-teal-400 hover:text-purple-800">Shop Now</Link>
            </div>
        </div>
    )
}

export default Hero;