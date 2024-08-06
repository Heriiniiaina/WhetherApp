import React from 'react';

export default function Current({ weather }) {
  return (
    <div className="current-weather">
      <h2>{weather.location}</h2>
      <div className="current-temperature">
        <span>{weather.temperature}°</span>
        <span>{weather.description}</span>
      </div>
      <p>{weather.summary}</p>
    </div>
  );
}
