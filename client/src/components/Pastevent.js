import { TiMessages } from 'react-icons/ti'
import { RiArrowDropDownLine } from 'react-icons/ri';
import { useState } from 'react';
import Attendees from './Attendees';


const Pastevent = ({ business, location, date, attending}) => {
   
    const [expand, setExpand] = useState(false);

    const controlExpand = () => {
        if(expand){
            setExpand(false);
        } else {
            setExpand(true);
        }
    }

    //need to filter out the user from the attending array.

    return (
        <div className={"event w-9/12 h-fit m-auto justify-center p-2 mt-1 mb-4 md:w-6/12 lg:w-5/12 xl:w-3/12"}>

            {/* Top row */}
            <div className="w-full flex p-2 justify-between">
                <h3 className="theme-green font-extrabold tracking-tight text-2xl">{business}</h3>
                <p className="theme-green font-bold italic p-1">{date}</p>
            </div>

            <p className='m-auto'>Stay in contact with your new friends!</p>
            
            <div className={expand ? "h-fit w-11/12 m-auto" : "w-11/12 m-auto"}>
                    {attending.map((attendee, index) => {
                        return <Attendees key={index} user2Id={attendee}/>;
                    })}
                </div>

            <div onClick={() => controlExpand()} className="flex-col z-10 cursor-pointer">
                <RiArrowDropDownLine style={expand ? {transform: 'rotate(180deg)' } : ""} onClick={() => controlExpand()} className="theme-green drop mx-auto mb-0 mt-2" size={55}/>
            </div>
        </div>
    );
}

export default Pastevent;