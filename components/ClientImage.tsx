'use client'
import React from 'react'
import { CldImage } from 'next-cloudinary'

const ClientImage = (props: {img: string, title: string}) => {
    const { img, title } = props
        return(
    <>{img && <CldImage src={img} width={500} height={500} alt={title} />}</>
)}

export default ClientImage