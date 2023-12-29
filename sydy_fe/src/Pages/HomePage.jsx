import Item from "../Components/Item";
import { useState , useEffect} from "react";
import ItemServices from "../Services/ItemServices";
const HomePage = () => {
  const [topItems, setTopItems] = useState([]);

  useEffect(() => {
    // Create an instance of ItemServices
    const itemServices = new ItemServices();

    // Define an async function to fetch top items
    const fetchTopItems = async () => {
      try {
        const topItemsData = await itemServices.getTopItems();
        // Update state with the fetched top items
        setTopItems(topItemsData);
      } catch (error) {
        // Handle errors
        console.error('Error fetching top items:', error);
      }
    };

    // Call the async function within useEffect
    fetchTopItems();
  }, []);
    return (
      <div>
        <div className="relative">
          <video
            className="h-auto object-cover"
            preload="auto"
            autoPlay
            muted
            loop
          >
            <source src="/assets/img/landing.mp4" />
          </video>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center tracking-wider leading-relaxed  text-5xl text-base-cream cursor-none">
            Making every day better.
          </div>
        </div>
        <div>
          <div>Outstanding Item</div>
        <div className="flex flex-wrap gap-1 items-center justify-center">
        {topItems.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </div>
        </div>
        
      </div>
    );
  };
  
  export default HomePage;
  