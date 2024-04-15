import React from 'react';

const RaffleCard = ({ raffle }) => {
  const { name, created_at, winner, raffled_on } = raffle;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Created on: {new Date(created_at).toLocaleString()}</p>
        {winner ? (
          <p className="card-text">Winner: {winner.first_name} {winner.last_name}</p>
        ) : (
          <p className="card-text">Winner: No winner drawn yet.</p>
        )}
        {raffled_on ? (
          <p className="card-text">Raffled on: {new Date(raffled_on).toLocaleString()}</p>
        ) : (
          <p className="card-text">Raffled on: Not raffled yet.</p>
        )}
      </div>
    </div>
  );
};

export default RaffleCard;




