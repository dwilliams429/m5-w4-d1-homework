import { useState, useEffect } from "react";
import "./App.css";

import countries from "i18n-iso-countries";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTemperatureLow,
  faTemperatureHigh,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

// Register locale AFTER imports
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App() {
  // State
  const [apiData, setApiData] = useState({});
  const [getState, setGetState] = useState("Irvine, USA");
  const [state, setState] = useState("Irvine, USA");

  const apiKey = process.env.REACT_APP_API_KEY;

  // Side effect
  useEffect(() => {
    if (!apiKey) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data))
      .catch((err) => console.error(err));
  }, [state, apiKey]);

  const inputHandler = (event) => setGetState(event.target.value);

  const submitHandler = () => setState(getState);

  const kelvinToFarenheit = (k) => ((k - 273.15) * 1.8 + 32).toFixed(0);

  return (
    <div className="App app-container">
      <header className="d-flex justify-content-center align-items-center">
        <h2>React Weather App</h2>
      </header>

      <div className="container">
        <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
          <div className="col-auto">
            <label htmlFor="location-name" className="col-form-label">
              Enter Location :
            </label>
          </div>

          <div className="col-auto">
            <input
              type="text"
              id="location-name"
              className="form-control"
              onChange={inputHandler}
              value={getState}
            />
          </div>

          <button className="btn btn-primary mt-2" onClick={submitHandler}>
            Search
          </button>
        </div>

        <div className="card mt-3 mx-auto">
          {apiData.main ? (
            <div className="card-body text-center">
              <img
                src={`http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`}
                alt="weather status icon"
                className="weather-icon"
              />

              <p className="h2 mt-3">
                {kelvinToFarenheit(apiData.main.temp)}° F
              </p>

              <p className="h5 mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="text-dark" />{" "}
                <strong>{apiData.name}</strong>
              </p>

              <div className="row mt-4">
                <div className="col-md-6 text-start">
                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureLow}
                      className="text-primary me-2"
                    />
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_min)}° F
                    </strong>
                  </p>

                  <p>
                    <FontAwesomeIcon
                      icon={faTemperatureHigh}
                      className="text-danger me-2"
                    />
                    <strong>
                      {kelvinToFarenheit(apiData.main.temp_max)}° F
                    </strong>
                  </p>
                </div>

                <div className="col-md-6 text-center">
                  <p>
                    <strong>{apiData.weather[0].main}</strong>
                  </p>
                  <p>
                    <strong>
                      {countries.getName(apiData.sys.country, "en", {
                        select: "official",
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <h1>Loading....</h1>
          )}
        </div>
      </div>

      <footer className="footer">&copy; React Weather App</footer>
    </div>
  );
}

export default App;
