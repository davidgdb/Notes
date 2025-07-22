import NavBar from '../components/NavBar.jsx';
import {useEffect, useState} from "react";
import RateLimitedUI from "../components/RateLimitedUI.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try{
        const res = await axios.get('http://localhost:5001/api/notes');
        console.log(res.data);
        setNotes(res.data);
        setIsRateLimited(false);
      }
      catch(err){
        console.log(err);
        if(err.response?.status === 429){
          setIsRateLimited(true);
        }
        else{
          toast.error("Error fetching notes");
        }
      }
      finally {
        setLoading(false);
      }
    }

    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      {isRateLimited && <RateLimitedUI/>}
    </div>
  );
};

export default HomePage;