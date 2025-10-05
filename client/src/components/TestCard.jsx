/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Images from "../constants/Images";
import { UseGlobalContext } from "./Context/Globalcontext";

const TestCard = ({
  name,
  description,
  price,
  handleInsertIntoCart,
  insertIntoCart,
  index,
}) => {
  const { user, userCart, setUserCart } = UseGlobalContext()
  const [addedToCart, setAddedToCart] = useState(false)
  useEffect(() => {
    userCart.find(obj => obj.testName === name) ? setAddedToCart(true) : setAddedToCart(false)
  }, [userCart])


  const handleCart = async () => {
    try {
      if (!addedToCart) {
        const tempCartData = {
          userId: user._id,
          testName: name,
          price: price,
        }
        const response2 = await fetch(`http://localhost:5000/api/cart/add`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempCartData)
        })
        if (response2.ok) {
          setUserCart([
            ...userCart,
            {
              testName: name,
              price: price,
            }
          ])
        }
      }else{
        const tempCartData = {
          userId: user._id,
          testName: name,
        }
        const response2 = await fetch(`http://localhost:5000/api/cart/remove`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(tempCartData)
        })
        if (response2.ok) {
          setUserCart(userCart.filter( obj => obj.testName != name ))
        }
      }
    } catch (error) {
      throw new Error(error)
    }
  }
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      <img className="w-full h-48 object-cover" src={Images.test_img} alt={name} />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-600 text-sm mt-1">{description}</p>
        <p className="text-xl font-bold text-gray-800 mt-2">₹{price}</p>
        <div className="mt-4 flex items-center space-x-4">
          <button
            onClick={handleCart}
            className={`py-3 px-5 text-white font-bold cursor-pointer rounded ${addedToCart ? "bg-red-500" : "bg-green-500"
              }`}
          >
            {addedToCart ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCard;