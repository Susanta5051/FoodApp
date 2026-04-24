import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import img from '../assets/media/resturant.webp'
import ProductBox from "../components/ProductBox";
import data from "../assets/media/ProductsDetails";
import { useResturantStore } from "../store/useResturantstore";


type Product = {
  _id:string;
  image:string;
  name:string;
  desc:string;
  price:number;
  address:string;
  store:string;
  quantity:string;
}
const StoreDetails = () => {
  const { resturantId } = useParams();
  const id = resturantId as string;
  const navigate = useNavigate();
  const { getStoreDetails, detailedResturant } = useResturantStore();

  useEffect(() => {
    if (id) {
      getStoreDetails(id);
    }
  }, [id]);

  const products =
    detailedResturant?.menus?.map((menu) => ({
      _id: menu._id,
      image: menu.image,
      name: menu.name,
      desc: menu.desc,
      price: menu.price,
      quantity: menu.quantity,
      address: detailedResturant.address,
      store: detailedResturant.resturantName,
    })) || [];

  return (
    <div className="flex flex-col">
      <div className="absolute left-0" onClick={() => navigate(-1)}>
        <ArrowLeft />
      </div>

      {/* profile */}
      <div className="p-10">
        <div className="border-2 border-black max-w-50 rounded-full overflow-hidden m-5 object-cover">
          <img src={detailedResturant?.imageUrl} />
        </div>

        <div>
          <p>{detailedResturant?.resturantName}</p>
          <p>{detailedResturant?.phone}</p>
          <p>{detailedResturant?.address}</p>
          <p>{detailedResturant?.pincode}</p>
          <p>{detailedResturant?.category}</p>
        </div>
      </div>

      <h1 className="text-center text-2xl font-bold mb-4">Menus</h1>
      <hr className=" border-gray-500 w-full font-extrabold mb-4" />
      {/* products */}
      <div>
        <div className="flex flex-wrap gap-4">
          {products.map((p, index) => (
            <ProductBox
              _id={p._id}
              key={index}
              image={p.image}
              name={p.name}
              price={p.price}
              desc={p.desc}
              quantity={JSON.stringify(p.quantity)}
              address={p.address}
              store={p.store}
            />
          ))}
        </div>

        {products.length === 0 && <div>NO Menus FOUND</div>}
      </div>
    </div>
  );
};
export default StoreDetails
