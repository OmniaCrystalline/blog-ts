'use client'
import { useSession } from "next-auth/react";
import { addComment } from '../components/actions/action'

export interface IComment {
  userEmail: string,
  postSlug: string,
  desc: string,
}

const CommentForm = (props: { slug: string }) => {
  const { data: session } = useSession()

  const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const desc = formData.get('desc') as string
    if (!desc || !session?.user?.email) {
      alert('Authtorization required')
      return
    }
    const comment: IComment = {
      userEmail: session?.user?.email,
      postSlug: props.slug,
      desc
    }
    await addComment(comment)
    form.reset()
  }

  return (
    <div className='w-full grid gap-4 mt-5'>
      <form className='flex gap-4' onSubmit={handleComment} >
        <textarea
          name='desc'
          minLength={5}
          required
          placeholder='write a comment...'
          className='w-full block bg-inherit px-5 py-2 border border-neutral-500 rounded-lg min-h-24'>
        </textarea>
        <button type='submit' className='w-fit h-fit place-self-end px-5 py-2 ml-auto border bg-neutral-500/50 outline-none hover:shadow-md hover:bg-neutral-600/50'>submit</button>
      </form>
    </div>
  )
}

export default CommentForm