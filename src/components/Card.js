import React, {useEffect, useState, useRef} from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart()

    const priceRef = useRef()

    let options = props.options
    let price_options = Object.keys(options)
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("")
    const handelAddToCart = async() => {
        let food = null

        for(const item of data){
            if(item.id === props.food_item._id){
                food = item
                break
            }
        }

        if(food){
            if(food.size === size){
                await dispatch({type: "UPDATE", id: props.food_item._id, price: finalPrice, qty: qty})
                return
            }
            else{
                await dispatch({type: "ADD", id: props.food_item._id, name: props.food_item.name, price: finalPrice, qty: qty, size: size})
            }
        }
        else{
            await dispatch({type: "ADD", id: props.food_item._id, name: props.food_item.name, price: finalPrice, qty: qty, size: size})
        }

        // await dispatch({type:"ADD", id:props.food_item._id, name:props.food_item.name,
        //     price:finalPrice, qty:qty, size:size 
        // })
        await console.log(data)
    }
    let finalPrice = qty*parseInt(options[size])
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])
    return (
        <div>
            <div className="card rounded m-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                <img className="card-img-top" src={props.food_item.img} style={{ height: "175px", objectFit: "fill" }} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{props.food_item.name}</h5>
                    {/* <p className="card-text">My card</p> */}

                    <div className='container w-100'>

                        <select className="m-2 h-100 text-white bg-primary rounded" onChange={(e)=>setQty(e.target.value)}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>

                        <select className="m-2 h-100 text-white bg-primary rounded" ref={priceRef} onChange={(e)=>setSize(e.target.value)}>
                            {price_options.map((data) => {
                                return (
                                    <option value={data} key={data}>{data}</option>
                                )
                            })}
                        </select>

                        <div className='fs-5 d-inline'>
                            ${finalPrice}
                        </div>
                    </div>
                    <hr />
                            <button className={'btn btn-success justify-center ms-2'} onClick={handelAddToCart}>
                                Add to Cart
                            </button>
                </div>
            </div>
        </div>
    )
}


{/* <a href="#" className="btn btn-primary">Go somewhere</a> */ }

//  https://img.taste.com.au/1xpeJEYD/taste/2019/06/one-pan-paneer-and-spinach-tikka-masala-150801-1.jpg