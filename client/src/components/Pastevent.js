import { useState } from "react";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { TiMessages } from 'react-icons/ti'

const Pastevent = ({ business, location, description, capacity, taken, id, date, time, attending }) => {
   
    const [expand, setExpand] = useState(false);

    const controlExpand = () => {
        if(expand){
            setExpand(false);
        } else {
            setExpand(true);
        }
    }


    return (
        <div className={"event w-9/12 h-fit m-auto justify-center p-2 mt-1 mb-4 md:w-6/12 lg:w-5/12 xl:w-3/12"}>

            {/* Top row */}
            <div className="w-full flex justify-between mb-4 pt-2">
                <h3 className="theme-green font-extrabold tracking-tight text-2xl p-1">{business}</h3>
                <TiMessages size={40} className="theme-green mr-4 cursor-pointer hover:text-black"/>
            </div>
            
            <div className="flex justify-between" >
                <p className="theme-green font-bold p-1 text-xl italic">{location}</p>
                <p className="theme-green p-2 font-bold italic">{date}</p>
            </div>

                
                
           
        </div>
    );
}

export default Pastevent;