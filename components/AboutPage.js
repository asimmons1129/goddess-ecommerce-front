export default function AboutPage(){
    return (
        <div className="h-screen bg-fixed bg-center bg-cover custom-img">
                <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden h-screen">
                    <div className="h-screen bg-gradient-to-t from-indigo-100 to-gray mt-12 py-4 md:py-12 z-[10] md:ml-10 md:mr-10 z-[10] overflow-auto">
                        <h1 className="py-6 text-center font-bold text-4xl text-purple-300">About Meagan</h1>
                        <hr className="w-6 h-1 mx-auto my-2 bg-teal-500 border-0 rounded"></hr>
                        <div className="md:p-10 md:flex py-4 md:py-24 lg:grid-cols-2 justify-center items-center">
                            <div className="p-10 flex justify-center w-full">
                                <img src="/about-me.png" alt="" className="w-[240px] h-[240px] lg:w-[380px] lg:h-[380px] md:ml-6 rounded-full"/>
                            </div>
                            <div className="p-10 md:ml-10 md:mr-10 text-left md:text-left w-full">
                                <h2 className="font-bold text-4xl md:text-left text-center md:text-4xl text-purple-300 pb-4">Hey there Goddess!</h2>
                                <p className="text-lg md:text-xl text-gray-200">
                                        I'm Meagan, the owner of Goddess Lashes by Iris! For years, 
                                        I've had a passion for encouraging women to embrace their 
                                        inner goddess.  To me, a goddess is a female of power, beauty
                                        and elegance.  The best way to express your inner goddess is 
                                        to stand out, and what better way to stand out than with these
                                        lashes! So, I challenge you! Make your statement! Embrace that 
                                        goddess! Lash Out Loud today!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
}