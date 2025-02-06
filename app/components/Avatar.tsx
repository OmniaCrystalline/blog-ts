import React from 'react'
import Image from 'next/image'
import { User } from '@prisma/client'

interface IAvatar {
  user: User,
  datestring: string,
}

const Avatar: React.FC<IAvatar> = ({ user, datestring }) => {
  const  { id, image, name } = user
  return (<div className='flex gap-2 place-items-center p-2' key={id}>
    <Image src={image ?? '/imgs/ava1.jpg'} alt={name || 'Avatar'} width='24' height='24' className='w-12 h-12 rounded-full' />
    <div className=''><span className=''>{name}</span> <br></br>
      <span>{datestring}</span></div></div>
  )
}

export default Avatar


