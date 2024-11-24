import React, { useState, useEffect } from 'react';

function Gallery() {
  const [tours, setTours] = useState([]);  // State for storing tour data
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  // Fetch tour data from API
  useEffect(() => {
    fetch('https://course-api.com/react-tours-project')
      .then(response => response.json())
      .then(data => {
        setTours(data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch tours');
        setLoading(false);
      });
  }, []);

  // Function to handle "Not Interested" button click
  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  // Function to toggle the description visibility
  const toggleDescription = (id) => {
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, showDescription: !tour.showDescription } : tour
    ));
  };

  // If loading, display loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="tour-list">
      {tours.map((tour) => (
        <div key={tour.id} className="tour-card">
          <img src={tour.image} alt={tour.name} />
          <h2>{tour.name}</h2>
          <p>Price: ${tour.price}</p>
          <p>
            {tour.showDescription ? tour.description : `${tour.description.substring(0, 100)}...`}
          </p>
          <button onClick={() => toggleDescription(tour.id)}>
            {tour.showDescription ? 'Show Less' : 'Read More'}
          </button>
          <button onClick={() => removeTour(tour.id)}>Not Interested</button>
        </div>
      ))}
    </div>
  );
}

export default Gallery;
