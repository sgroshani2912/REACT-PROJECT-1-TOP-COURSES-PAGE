import React from "react";
import {apiUrl, filterData} from './data';
import Filter from './components/Filter';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import { useEffect} from "react";
import { useState } from "react";
import Spinner from './components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState(filterData[0].title);

  async function fetchData(){
    setLoading(true);
    try{
      let res = await fetch(apiUrl);
      let output = await res.json();
      setCourses(output.data);
    }
    catch(e){
      toast.e("Something went wrong");
    }
    setLoading(false);
  }

  useEffect(()=> {
    fetchData();
  },[])

  return (
    <div className="min-h-screen flex flex-col bg-bgDark2">
      <div>
        <Navbar/>
      </div>


      <div className="bg-bgDark2">
      <div >
        <Filter filterData={filterData}
        category = {category} 
        setCategory = {setCategory}  
        />
      </div>
      

      <div className="w-11/12 max-w-[1200px] 
        mx-auto flex flex-wrap justify-center items-center min-h-[50vh]">
      {
        loading ? (<Spinner/>) : (<Cards courses = {courses} category = {category} />)
      }
      </div>
      </div>
      
      
    </div>
  );
};

export default App;
