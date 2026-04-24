import { Edit, Plus, X } from 'lucide-react';
// import image from '../assets/resturant.webp'
import { Button } from '../../../components/ui/button'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useResturantStore } from '../../../store/useResturantstore';
import useMenuStore from '../../../store/useMenuStore';
type MenuType = {
  _id:string;
  resturantId:string;
  name:string;
  desc:string;
  image:string;
  price:number;
  quantity:number;
  categories:Array<string>
}
const Home = () => {
  const navigate = useNavigate();
  const {getResturant , resturant} = useResturantStore();
  const{addEditMenu , deleteMenu} = useMenuStore();
  const [Products,setProducts] = useState<Array<MenuType>>([])  
  // if(resturant === null){
  //   getResturant()
  // }
  const handleDelete = async(menuId:string)=>{
    await deleteMenu(menuId);
    await getResturant();
  }
  console.dir(resturant)

  useEffect(() => {
  const fetchData = async () => {
    await getResturant();
  };
  fetchData();
}, []);

useEffect(() => {
  if (resturant?.menus) {
    setProducts(resturant.menus);
  }
}, [resturant]);
  
  return (
    <div>
      <div className='p-10 bg-linear-to-l from-orange-300 to-blue-300'>
        
        <div className="h-52 overflow-hidden">
          <img
            src={resturant?.imageUrl}
            alt="profile"
            className="w-full h-full object-contain"
          />
        </div>
        <p>{resturant?.resturantName}</p>
        <p>{resturant?.category}</p>  
        <p>{resturant?.phone}</p> 
        <p>{resturant?.address}</p> 
        <p>{resturant?.pincode}</p> 
        <Button onClick={()=>navigate('/resturant/edit-profile')}>Edit Profile</Button>
      </div>
      <div>
        <div className='relative '><p className='absolute border-black bg-white p-0.5 bottom-1 left-5'>MENUS</p></div>
        <div className='relative '><Plus onClick={()=>navigate('add-product')} className='absolute bg-blue-600 rounded-full w-10 h-10 bottom-2 right-5'/></div>
        <div className='grid grid-cols-7 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-12 border-2 text-[11px] sm:text-lg border-gray-600 '>
                <div className='col-span-1 text-center flex justify-center '>Sl.no</div>
                <div className='col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-6 text-center flex justify-center '>Name</div>
                <div className='col-span-1 text-center flex justify-center '>Image</div>
                <div className='col-span-1 text-center flex justify-center '>Price</div>
                <div className='col-span-1 text-center flex justify-center '>Quantity</div>
                <div className='col-span-1 text-center flex justify-center '>Edit</div>
                <div className='col-span-1 text-center flex justify-center '>Delete</div>
            </div>
      </div>
      {
        Products.length !==0 ?
        <div >
        {
          Products.map((p,index)=>(
            <div key={p._id} className='grid grid-cols-7 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-12 border-2 border-gray-600 text-[11px] sm:text-lg'>
                <div className='col-span-1 text-center flex justify-center items-center '>{index+1}</div>
                <div className='col-span-1 sm:col-span-3 md:col-span-4 lg:col-span-6 text-center flex justify-center items-center '>{p.name}</div>
                <div className='col-span-1 text-center flex justify-center items-center '><img width={60} src={p.image}></img></div>
                <div className='col-span-1 text-center flex justify-center items-center '>{p.price}</div>
                <div className='col-span-1 text-center flex justify-center items-center '>{p.quantity}</div>
                <div className='col-span-1 text-center flex justify-center items-center '><Button onClick={ ()=>{addEditMenu(p); navigate(`${p._id}/edit-product`)}}><Edit/></Button></div>
                <div className='col-span-1 text-center flex justify-center items-center '><Button onClick={()=>handleDelete(p._id)}><X/></Button></div>
            </div>
          ))
        }
      </div>
      :
      <div className='block text-center text-5xl'>
        No Menus found
      </div>
      }
    </div>
  )
}

export default Home
