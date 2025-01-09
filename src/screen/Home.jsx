import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';


export default function Home() {
  const [search, setSearch] = useState('');
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItem] = useState([]);
  const loadData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/foodData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      // Ensure data structure matches expectations
      if (Array.isArray(data) && data.length >= 2) {
        setFoodItem(data[0] || []); // Ensure it's an array
        setFoodCat(data[1] || []); // Ensure it's an array
      } else {
        console.error("Unexpected API response structure:", data);
        setFoodItem([]);
        setFoodCat([]);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setFoodItem([]);
      setFoodCat([]);
    }
  };


  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{ objectFit: "contain ! important" }}>

        <div className="carousel-inner " id='carousel'>
          <div class=" carousel-caption  " style={{ zIndex: "9" }}>
            <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
              <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
              {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
            </div>
          </div>
          <div className="carousel-item active" >
            <img src="https://www.allrecipes.com/thmb/5JVfA7MxfTUPfRerQMdF-nGKsLY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/25473-the-perfect-basic-burger-DDMFS-4x3-56eaba3833fd4a26a82755bcd0be0c54.jpg" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://i.ytimg.com/vi/OHXLCqvP7AM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDMY9bcGL9DHp9KhJ1xULqH5Rte7g" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://content.jdmagicbox.com/comp/def_content/barbeque-restaurants/barbeque-restaurants9-barbeque-restaurants-9-rza2e.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://images.mrcook.app/recipe-image/01922de8-8871-71c0-947a-99a06af71b7c" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://cdn.britannica.com/35/225835-050-A5CC289A/Indian-one-pot-meal-for-party.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>
          <div className="carousel-item">
            <img src="https://t4.ftcdn.net/jpg/06/20/48/73/360_F_620487372_6eYL1S63J1TyhW24PJkNqjg70sCKN0pN.jpg" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
          </div>

        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
     
      <div className="m-3 container">
        {foodCat.length > 0 ? (
          foodCat.map((category) => (
            <div key={category._id}>
              <div className="fs-3 m-3">{category.CategoryName}</div>
              <hr />
              <div className="row gx-5 gy-3" style={{ rowGap: '3rem', columnGap: '3rem' }}>
                {foodItems.length > 0 ? (
                  foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === category.CategoryName &&
                        item.name.toLowerCase().includes(search.toLocaleLowerCase())
                    )
                    .map((filteredItem) => (
                      <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                        <Card
                          filteredItem={filteredItem} // Pass the entire filteredItem object
                          foodName={filteredItem.name}
                          ImgSrc={filteredItem.img}
                          options={filteredItem.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div className="col-12">No Items Found in this Category</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>Loading Categories...</div>
        )}
      </div>
    

      <Footer />
    </div>
  );
}
