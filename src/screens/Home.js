import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousal from '../components/Carousal'


export default function Home() {
    const [search, setSearch] = useState("");

    const [food_category, setFoodCategory] = useState([]);

    const [food_item, setFoodItem] = useState([]);

    const load_data = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        response = await response.json();

        setFoodItem(response[0]);
        setFoodCategory(response[1]);
    }

    useEffect(() => {
        load_data()
    }, []);

    return (
        <div>
            <div><Navbar /></div>
            <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-inner">

                    <div class="carousel-caption d-none d-md-block" style={{ zIndex: "5" }}>
                        <div class="d-flex justify-content-centre">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}}/>
                            {/* <button class="btn btn-outline-info text-white bg-primary" type="submit">Search</button> */}
                        </div>
                    </div>

                    <div className="carousel-item active">
                        <img src="https://picsum.photos/1300/450?random=1" className="d-block w-100 " alt="error" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/1300/450?random=2" className="d-block w-100 " alt="error" />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/1300/450?random=3" className="d-block w-100 " alt="error" />
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
            </div></div>
            <div className='container'>
                {
                    food_category != []
                        ? food_category.map((data) => {
                            return (
                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>
                                        {data.CategoryName}
                                    </div>
                                    <hr />

                                    {food_item != []
                                        ? food_item.filter((items) => (items.CategoryName == data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                            .map(filter_items => {
                                                return (
                                                    <div key={filter_items._id} className='col-12 col-md-6 col-lg-3'>
                                                        <Card 
                                                            food_item = {filter_items}
                                                            options={filter_items.options[0]}
                                                        >
                                                        </Card>
                                                    </div>
                                                )
                                            })
                                        : alert("something went wrong")
                                    }

                                </div>
                            )
                        })
                        : alert("something went wrong")
                }
            </div>
            <div><Footer /></div>
        </div>
    )
}
