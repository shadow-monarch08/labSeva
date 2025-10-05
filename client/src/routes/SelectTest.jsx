import { useState } from "react";
import { labTests } from '../constants/labTests'
import TestCard from "../components/TestCard";
import Navbar from "../components/Navbar";

function SelectTest() {
    const [insertIntoCart, setInsertIntoCart] = useState();

    function handleInsertIntoCart(index) {
        setInsertIntoCart((prev) =>
            prev.map((value, i) => (i === index ? !value : value))
        );
    }

    return (
        <>
        <Navbar/>
            <div className="flex justify-center w-full py-[2rem] pt-[7rem]">
                <div className="grid grid-cols-3 gap-[1.5rem] w-[75%]">
                    {labTests.map(({ name, price, description, imgSrc }, index) => (
                        <TestCard
                            key={index}
                            name={name}
                            price={price}
                            description={description}
                            imgSrc={imgSrc}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default SelectTest;