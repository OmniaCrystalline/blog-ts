'use client'
import { useEffect, useState } from "react";


const page = () => {
  const [email, setemail] = useState('')
  const [posts, setposts] = useState([])
  console.log('posts', posts)

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('email'));
    console.log('email', email)
    if (email) {
      setemail(email);
    }
  }, []);

  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch('/api/author', { email })
      let data = await res.json()
      setposts(data)
    }
    fetchPosts()
  }, [email])
  

  return (
    <div className='container'>
      {email}
    </div>
  )
}

export default page


