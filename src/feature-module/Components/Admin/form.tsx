import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddAdmin from './AddAdmin';

// Define types
interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  cca2: string;
}

interface City {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

const CountryCityForm = () => {
  const [countries, setCountries] = useState<Country[]>([]); // List of countries
  const [cities, setCities] = useState<City[]>([]); // List of cities
  const [selectedCountry, setSelectedCountry] = useState<string>(''); // Selected country code

  // Step 1: Fetch all countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>('https://restcountries.com/v3.1/all?fields=name,cca2');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Step 2: Fetch cities for the selected country
  useEffect(() => {
    const fetchCities = async () => {
        const api =`https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${selectedCountry}/cities`
        console.log(api);
      if (selectedCountry) {
        try {
          const response = await axios.get<{ data: City[] }>(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/countries/${selectedCountry}/cities`,
            {
                headers: {
                    'x-rapidapi-key': '58591863dbmsh9f74b82a61055f3p17a2adjsn5c2dd128dc01',
                    'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
                },
            }
          );
          setCities(response.data.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      }
    };

    fetchCities();
  }, [selectedCountry]);

  // Handle country selection
  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <><AddAdmin/>
    <div>
      <h1>Country and City Selector</h1>

      {/* Country Dropdown */}
      <div>
        <label htmlFor="country">Select a Country:</label>
        <select id="country" value={selectedCountry} onChange={handleCountryChange}>
          <option value="">-- Select a Country --</option>
          {countries.map((country) => (
            <option key={country.cca2} value={country.cca2}>
              {country.name.common}
            </option>
          ))}
        </select>
      </div>

      {/* City Dropdown */}
      <div>
        <label htmlFor="city">Select a City:</label>
        <select id="city">
          <option value="">-- Select a City --</option>
          {cities.map((city) => (
            <option key={city.id} value={city.name}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
      
    </div></>
  );
};

export default CountryCityForm;