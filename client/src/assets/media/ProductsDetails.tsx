
import Food1 from './food.jpg'
import Food2 from './food2.jpg'
import Food3 from './food3.jpg'
import Food4 from './food4.jpg'
import Food5 from './foo5.jpg'
import Food6 from './food6.jpg'

type ContainerType = {
  image:any;
  name:string;
  desc:string;
  price:number;
  category:Array<string>;
  address:string,
  store :string
}

const data:Array<ContainerType> = [
    {
        image:Food1,
        name:"Pizza",
        desc:"A delicious rosted item made from vegitables and maida",
        price:120,
        category:["veg"],
        address:"Flat 4B, Saheed Nagar, Bhubaneswar, Khurda - 751007",
        store:" Toast to Coast"
    },
    {
        image:Food2,
        name:"Chicken Dum Biriyani",
        desc:"A tasty & delicious item made from rice cooked with chicken",
        price:180,
        category:["nonveg",'biriyani'],
        address:"Flat 4B, Saheed Nagar, Bhubaneswar, Khurda - 751007",
        store:"Biryani Grills"
    },
    {
        image:Food3,
        name:"Masala Dosa",
        desc:"A delicious south indian food made with rice and potato",
        price:60,
        category:["maincourse",'veg'],
        address:"Link Road, Cuttack - 753012,",
        store:"Brunch & Bubbles"
    },
    {
        image:Food5,
        name:"Sahi Paneer",
        desc:"A traditional punjabi veg item made with Paneer",
        price:80,
        category:["veg",'maincourse'],
        address:"Link Road, Cuttack - 753012,",
        store:"Brunch & Bubbles"
    },
    {
        image:Food4,
        name:"Bengali Fish",
        desc:"A bengali traditional item made with fish and secret masala",
        price:120,
        category:["nonveg",'maincourse'],
        address:"Flat 4B, Saheed Nagar, Bhubaneswar, Khurda - 751007",
        store:" UrbanBite Cafe"
    },
    {
        image:Food6,
        name:"Veg Thali",
        desc:"A special veg thali filled with rice, dal, mix veg & salad.",
        price:100,
        category:["veg",'thali'],
        address:"Bhoi Nagar, Unit - 9,Bhubaneswar, Khurda - 751022",
        store:"Brunch & Bubbles"
    },
];

export default data