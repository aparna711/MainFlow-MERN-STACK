function Card({title="No title", description="No information ia available"}) {
    return(
        <>
        <div className="card">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>   
            <button className="card-button">Learn More</button>
            <hr />
        </div>
        </>
        
    ) 
}
export default Card;