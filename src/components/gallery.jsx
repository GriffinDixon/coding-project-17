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
