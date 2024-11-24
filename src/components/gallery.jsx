import React, { useState, useEffect } from 'react';

function Gallery() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://course-api.com/react-tours-project')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const updatedData = data.map(tour => ({ ...tour, showDescription: false }));
        setTours(updatedData);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch tours');
        setLoading(false);
      });
  }, []);

  const removeTour = (id) => {
    setTours(tours.filter(tour => tour.id !== id));
  };

  const toggleDescription = (id) => {
    setTours(tours.map(tour => 
      tour.id === id ? { ...tour, showDescription: !tour.showDescription } : tour
    ));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!tours.length) return <div>No tours available.</div>;

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
