import React, { useState, useEffect } from 'react';
import RaffleCard from './RaffleCard';

const HomePage = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [raffles, setRaffles] = useState([]);
  const [newRaffleName, setNewRaffleName] = useState('');
  const [newRaffleToken, setNewRaffleToken] = useState('');

  // Function to fetch all raffles from the API
  const fetchRaffles = async () => {
    try {
      const response = await fetch(`${apiUrl}/raffles`);
      if (response.ok) {
        const data = await response.json();
        setRaffles(data.data); 
      } else {
        console.error('Failed to fetch raffles');
      }
    } catch (error) {
      console.error('Error fetching raffles:', error);
    }
  };

  useEffect(() => {
    fetchRaffles();
     // eslint-disable-next-line
  }, []); // Fetch raffles once on component mount

  const handleCreateRaffle = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/raffles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: newRaffleName,
          secret_token: newRaffleToken
        })
      });

      if (response.ok) {
        // Raffle created successfully, fetch updated list of raffles
        fetchRaffles();
        // Clear input fields after creating raffle
        setNewRaffleName('');
        setNewRaffleToken('');
      } else {
        throw new Error('Failed to create new raffle');
      }
    } catch (error) {
      console.error('Error creating raffle:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Raffle App</h1>

      <div className="card p-3 mt-5">
        <h2 className="mb-4">New Raffle</h2>
        <form onSubmit={handleCreateRaffle}>
          <div className="mb-3">
            <label htmlFor="raffleName" className="form-label">Raffle Name:</label>
            <input
              type="text"
              className="form-control"
              id="raffleName"
              value={newRaffleName}
              onChange={(e) => setNewRaffleName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="secretToken" className="form-label">Raffle Secret Token</label>
            <input
              type="text"
              className="form-control"
              id="secretToken"
              value={newRaffleToken}
              onChange={(e) => setNewRaffleToken(e.target.value)}
            />
            <div className="form-text">You must remember the raffle token because it will be asked when picking a winner.</div>
          </div>
          <button type="submit" className="btn btn-primary">Create New Raffle</button>
        </form>
      </div>

      <div className="mt-5">
        <h2>All Raffles:</h2>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {raffles.map((raffle) => (
            <RaffleCard key={raffle.id} raffle={raffle} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;











