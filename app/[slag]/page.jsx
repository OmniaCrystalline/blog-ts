import SideMenu from "../../components/SideMenu1"
import SideMenu2 from "../../components/SideMenu2"
import { OnePost } from "../../components/OnePost"

const page = async ({ params }) => {
    const { slag } = await params;
    return (
        <div className='ml-auto mr-auto min-h-screen'>
            <div className='p-5 grid gap-5' >
                <OnePost slag={slag} />
            </div>
            <div className='grid gap-5'>
                <SideMenu />
                <SideMenu2 />
            </div >
        </div>
    )
}

export default page