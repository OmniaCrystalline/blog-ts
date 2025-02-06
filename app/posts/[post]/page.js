import SinglePostPage from '@/app/components/SinglePostPage';

const page = ({ params }) => {  
  console.log('params', params)
  return (
    <div className='ml-auto mr-auto'>{<SinglePostPage post={params.slag} />}</div>
  )
}

export default page