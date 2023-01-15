
const Joinbutton = () => {

    const joinEvent = () => {
        fetch()
    }

  return (
    <button onClick={() => joinEvent(id)} type={"button"} 
        className={joined ? "btn joined" : "btn join-button"}>
        {joined ? 'Joined' : 'Join'}
    </button>
  )
}

export default Joinbutton
