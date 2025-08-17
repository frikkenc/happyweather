import React, { useState, useEffect } from 'react';
import './App.css';

const forecast = Array.from({ length: 100 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i);
  return {
    id: i,
    label: date.toDateString(),
    temp: "82°F",
    sky: "Sunny",
    wind: "Light Winds",
  };
});

function App() {
  const [city, setCity] = useState('');
  const [event, setEvent] = useState('');
  const [showWeather, setShowWeather] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showSunshineModal, setShowSunshineModal] = useState(false);
  const [sunStage, setSunStage] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [daysPerPage, setDaysPerPage] = useState(3);

  const ready = city && event;

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 800) setDaysPerPage(4);
      else if (width > 600) setDaysPerPage(3);
      else setDaysPerPage(2);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleForecast = forecast.slice(visibleIndex, visibleIndex + daysPerPage);

  return (
    <div className="app">
      <h1>HAPPYWEATHER.COM</h1>

      <blockquote>
        “If you visualize sunshine hard enough, the clouds will get self-conscious and move.”<br /> — Dan
      </blockquote>

      <div className="selectors">
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="" disabled>Select city</option>
          <option>Skydive Chicago</option>
          <option>Skydive Perris</option>
          <option>Perris CA</option>
          <option>Perris Valley Skydiving</option>
        </select>

        <select value={event} onChange={(e) => setEvent(e.target.value)}>
          <option value="" disabled>Select event</option>
          <option>IL 250-way</option>
          <option>2025 Vertical World Record</option>
          <option>P3 Big Way Camp</option>
          <option>P3 100 Way Camp</option>
          <option>P3 Spring Fling</option>
          <option>P3 Power Play</option>
          <option>P3 Sequential Camp</option>
          <option>P3 Winter Fling</option>
          <option>P3 Games</option>
          <option>P3 Other</option>
        </select>
      </div>

      {!ready && (
        <p style={{ fontStyle: 'italic', margin: '1rem 0' }}>
          Select your city and event to get your perfect weather forecast ☀️
        </p>
      )}

      {ready && !showWeather && (
        <button onClick={() => setShowWeather(true)}>Show Weather</button>
      )}

      {showWeather && (
        <>
          <h2>Perfect Skydiving Weather!</h2>

          <div className="action-buttons">
            <button onClick={() => setShowModal(true)}>Report Inaccuracies</button>
            <button
              className="emergency"
              onClick={() => {
                setSunStage(0);
                setShowSunshineModal(true);
              }}
            >
              EMERGENCY SUNSHINE
            </button>
          </div>

          <div className="forecast-wrapper">
            {visibleIndex > 0 && (
              <button
                className="arrow prev"
                onClick={() => setVisibleIndex(visibleIndex - daysPerPage)}
              >
                ←
              </button>
            )}

            <div className="forecast">
              {visibleForecast.map((f) => (
                <div key={f.id} className="forecast-card">
                  <strong>{f.label}</strong>
                  <div className="sun">☀️</div>
                  <p>{f.sky}</p>
                  <p>{f.temp}, {f.wind}</p>
                </div>
              ))}
            </div>

            {visibleIndex + daysPerPage < forecast.length && (
              <button
                className="arrow next"
                onClick={() => setVisibleIndex(visibleIndex + daysPerPage)}
              >
                →
              </button>
            )}
          </div>
        </>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>What do you see happening now?</h3>
            <label>
              Sky:
              <select>
                <option>Sun</option>
                <option>Really Sunny</option>
                <option>Very Sunny</option>
              </select>
            </label>
            <label>
              Wind:
              <select>
                <option>Calm Winds</option>
                <option>No Winds</option>
                <option>Light Winds</option>
              </select>
            </label>
            <label>
              Temperature:
              <select>
                <option>80 degrees</option>
                <option>81 degrees</option>
                <option>82 degrees</option>
              </select>
            </label>
            <label>
              Other (disabled):
              <select disabled>
                <option>Option unavailable</option>
              </select>
            </label>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showSunshineModal && (
        <div className="modal">
          {sunStage === 1 ? (
            <div className="sun-modal">
              <div className="full-sun-wrapper">
                <img src="/sun.png" alt="Sun" className="full-sun" />
                <div className="modal-buttons" style={{ position: 'absolute', bottom: '5%' }}>
                  <button onClick={() => setShowSunshineModal(false)}>It Worked!</button>
                  <button onClick={() => setSunStage(2)}>Still Nothing</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="modal-content">
              {sunStage === 0 && (
                <>
                  <h3>Hold this above your head, and when ready, push the button.</h3>
                  <div className="modal-buttons">
                    <button onClick={() => setSunStage(1)}>Button</button>
                  </div>
                </>
              )}

              {sunStage === 2 && (
                <>
                  <img src="/DanBc.png" alt="Dan BC" className="dan-image" />
                  <h3>“Visualizing is a powerful tool. Visualize sunshine now.”</h3>
                  <div className="modal-buttons">
                    <button onClick={() => setShowSunshineModal(false)}>It Worked!</button>
                    <button onClick={() => setSunStage(3)}>No Sun</button>
                  </div>
                </>
              )}

              {sunStage === 3 && (
                <>
                  <h3>We have one more thing to try. It is 100% effective.</h3>
                  <div className="modal-buttons">
                    <a href="https://furycoaching.youcanbook.me" target="_blank" rel="noreferrer">
                      <button className="book-now">Fool Proof Plan</button>
                    </a>
                    <button onClick={() => setShowSunshineModal(false)}>
                      Nah, I'll live with the rain
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
