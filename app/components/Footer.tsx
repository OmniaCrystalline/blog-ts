import React from 'react'
import { SiInstagram } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { SiViber } from "react-icons/si";
import Link from 'next/link';
import FooterLinks from './FooterLinks';

const Footer = () => {
    return (
        <div className='border-t-2 border-slate-500 px-5 py-5 '>
            <div className='grid gap-5 grid-cols-[1fr_1fr_1fr] md:grid-cols-[3fr_1fr_1fr_1fr]'>
                <div className='grid gap-2 col-span-3 md:col-span-1'>
                    <h1 className='font-bold mb-2'>Blog</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta iste similique omnis error iusto nam, enim ea deleniti. Harum sequi rerum perspiciatis illo earum eaque eos laboriosam repellat vitae et.</p>
                    <div className='flex gap-2 md:flex-2'>
                        <SiFacebook />
                        <FaTelegramPlane />
                        <SiViber />
                        <SiInstagram/>
                    </div>
                </div>
                <div className='grid place-items-stretch'>
                    <span className='font-bold mb-2'>Links</span>
                    <Link href='/'>Homepage</Link>
                    <Link href='/write'>Blogpage</Link>
                    <Link href='/login'>Loginpage</Link>
                    <Link href='/locked'>Lockedpage</Link>
                </div>
                <div className='grid gap-1 place-items-stretch'>
                    <span className='font-bold mb-2'>Social</span>
                    <Link href='/'>Facebook</Link>
                    <Link href='/'>Instagram</Link>
                    <Link href='/'>Viber</Link>
                    <Link href='/'>Telegram</Link>
                </div>
                <div className='grid gap-1 place-items-stretch'>
                    <FooterLinks />
                </div>
            </div>
        </div>
    )
}

export default Footer