import React, { useState } from 'react';
import CountUp from 'react-countup';

const api = {
  key: "6abb310ba447c57363a8b0f88e979268",
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  };

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app cold') : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search... city name"
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
              {/* <label className="mTemp">Minimum Temperature:
                                    <CountUp
                                    start={0}
                                    end={Math.round(weather.main.temp_min)}
                                    duration={2.75}
                                />°c
                                </label>
                            <label className="mTemp">Maximum Temperature:
                                    <CountUp
                                    start={0}
                                    end={Math.round(weather.main.temp_min)}
                                    duration={2.75}
                                />°c
                                </label> */}
            </div>
            <div className="weather-box">
              <div className="temp">
                <CountUp
                  start={0}
                  end={Math.round(weather.main.temp)}
                  duration={2.75}
                />°c
                            </div>
              <div className="weather">{weather.weather[0].main}</div>


            </div>

          </div>

        ) : ('')}

      </main>
    </div>
  );
}

export default App;