import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

const InstagramImg = ({socialImg}) => {
    return(
        <div className="relative">
            <Image src={socialImg} alt='/' className="w-full h-full" layout="responsive"/>
            <div className="flex justify-center items-center absolute top-0 left-0 right-0 bottom-0 hover:bg-black/50 group">
                <Link href="https://instagram.com/goddesslashes_byiris?igshid=MzRIODBiNWFIZA==" className="text-gray-300 hidden group-hover:block"><FaInstagram size={30}/></Link>
            </div>
        </div>
        
    );
}

export default InstagramImg