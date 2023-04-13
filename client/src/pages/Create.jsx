import React, { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker'
import { useSelector } from 'react-redux';

const Create = () => {
  
    const [ name, setName ] = useState('');
    const [ address, setAddress ] = useState('');
    const [ capacity, setCapacity ] = useState(10);
    const [ category, setCategory ] = useState('')
    const [ date, setDate ] = useState(new Date());
    const [ time, setTime ] = useState('');
    const [ am, setAm ] = useState(false)
    const [description, setDescription] = useState('');
   
    const token = useSelector((state) => state.token);

    const submitEvent = (e) => {
        e.preventDefault();
        let am_or_pm = ' PM';
        if(am){
            am_or_pm = ' AM'
        }
        let fullTime = time.concat(am_or_pm);
        const add = address.trim()
        fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${add}&key=${process.env.REACT_APP_GOOGLE}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let latitude = (data.results[0].geometry.location.lat);
            let longitude = (data.results[0].geometry.location.lng)
            fetch('http://localhost:4000/api/events/create', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    business: name,
                    address: address,
                    capacity: capacity,
                    category: category,
                    date: date,
                    time: fullTime,
                    description: description,
                    lat: latitude,
                    lng: longitude,
                })
            })
                .then(response => response.json())
                .then(data => {
                    if(data.error){
                        //loop through object keys and alert user of each error
                        let errors = data.error
                        const keys = Object.keys(errors);
                        keys.forEach((key, index) => {
                            alert(`${key}: ${errors[key]}`);
                        })
                    } else {
                        alert("Event successfully created")
                    }
                    console.log(data);
                })
                .catch(error => {
                    console.log(error);
                })
            }).catch(error => {
                console.log(error)
            })
   }
    
    return (
    <div className='h-screen w-full top-0 right-0 flex pt-20 sm:pt-40'>
      <div className='mx-auto rounded-md sm:m-4 bg-white max-h-3xl p-12 w-full h-fit sm:w-4/5 lg:w-3/5 xl:w-2/5'>
      <form onSubmit={(e) => submitEvent(e)} className='grid grid-cols-1 gap-3' id="myForm">
                    <label className='font-bold' htmlFor="business">Business Name</label>
                    <input placeholder="Business Name" onChange={(e) => setName(e.target.value)} 
                     value={name} id="business" className="form-control chat-input"
                    ></input>
                    <label className='font-bold' htmlFor="address">Address</label>
                    <input placeholder="street, city, ST" onChange={(e) => setAddress(e.target.value)}  
                     value={address} id="address" className="form-control chat-input"
                    ></input>
                    <label className='font-bold' htmlFor="capacity">Event Capacity</label>
                    <input placeholder="Capacity" id='capacity' onChange={(e) => setCapacity(e.target.value)}  
                     value={capacity} className="form-control chat-input"
                    ></input>
                    <label className='font-bold' htmlFor="category">Event Category</label>
                    <select id='category' value={category} onChange={(e) => setCategory(e.target.value)}
                    className='border border-1-black rounded-md p-1'>
                        <option value="bar">Bar</option>
                        <option value="sport">Sport</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="recreation">Recreation</option>
                    </select>
                    <div>
                        <p className="font-bold mt-2 text-black">Event date</p>
                        <div>
                            <DatePicker className='my-2' onChange={(date) => setDate(date)} value={date}/>
                        </div>
                    </div>
                    <label className='font-bold' htmlFor="time">Event Time</label>
                    <div className='flex gap-8'>
                        <input placeholder="Must be in format h:mm" onChange={(e) => setTime(e.target.value)}  
                        className="form-control chat-input max-w-xs" id='time'
                        ></input>
                        <button type='button' onClick={() => setAm(true)} className={am 
                        ? 'mx-2 px-4 rounded-lg bg-blue-700 text-white' 
                        : 'mx-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200'}
                        >AM</button>
                        <button type='button' onClick={() => setAm(false)} className={am 
                        ? 'mx-2 px-4 rounded-lg bg-slate-100 hover:bg-slate-200' 
                        : 'mx-2 px-4 rounded-lg bg-blue-700 text-white'}
                        >PM</button>
                    </div>
                    

                    <label className='font-bold' htmlFor="description">Event Description</label>
                    <textarea placeholder="Event Description"  
                     className="form-control chat-input h-40"
                     onChange={(e) => setDescription(e.target.value)}
                     value={description}
                     id='description'
                    ></textarea>

                    <button type="submit" 
                    className="sign-up btn btn-light sub"
                    >Create Event</button>
            </form>
      </div>
    </div>
  )
}

export default Create
