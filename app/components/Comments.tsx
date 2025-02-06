import Avatar from './Avatar'
import { User as IUser } from '@prisma/client'

const datestring = (createdAt: Date) => ("0" + createdAt.getDate()).slice(-2) + "-" + ("0" + (createdAt.getMonth() + 1)).slice(-2) + "-" +
  createdAt.getFullYear()

interface CommentsProps  {
  comments: Array<{
    id: string;
    createdAt: Date;
    desc: string;
    user: IUser;
  }>
}

const Comments = ({ comments }: CommentsProps) => {
  return (<div className='grid gap-2'>
    {comments?.map(item => <div key={item.id} className='px-5'>
      <Avatar datestring={datestring(item.createdAt)} user={item.user} />
      <div className='px-2'>{item.desc}</div>
    </div>)}
  </div>
  )
}

export default Comments