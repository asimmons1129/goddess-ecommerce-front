import Link from 'next/link';
import IgImg1 from '../public/ig-pic-1.png';
import IgImg2 from '../public/ig-pic-2.png';
import IgImg3 from '../public/ig-pic-3.png';
import IgImg4 from '../public/ig-pic-4.png';
import IgImg5 from '../public/ig-pic-5.png';
import IgImg6 from '../public/ig-pic-6.png';
import InstagramImg from './InstagramImg';

const Instagram = () => {
    return(
        <div className="bg-fixed bg-center bg-cover custom-img">
            <div className="top-0 left-0 right-0 bottom-0 bg-black/70 z-[2] overflow-hidden">
                <div className="mx-auto text-center py-24 bg-gradient-to-b from-indigo-100 to-gray md:ml-10 md:mr-10 z-[10]">
                    <p className="text-2xl text-purple-900 font-bold mt-12">Follow us on Instagram!</p>
                    <Link href="https://instagram.com/goddesslashes_byiris?igshid=MzRIODBiNWFIZA==" className="pb-4 text-purple-900 hover:text-teal-600">@goddesslashes_byiris</Link>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 p-4">
                        <InstagramImg socialImg={IgImg1} />
                        <InstagramImg socialImg={IgImg2} />
                        <InstagramImg socialImg={IgImg3} />
                        <InstagramImg socialImg={IgImg4} />
                        <InstagramImg socialImg={IgImg5} />
                        <InstagramImg socialImg={IgImg6} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Instagram