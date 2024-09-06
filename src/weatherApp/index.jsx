
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const Index = () => {
  const [city, setCity] = useState("");
  const fetchWeather = async () => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1a675b37cc27bd9a21d41c4ef8551d74`
    );
    console.log(res.data);
    return res.data;
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['weather',city],
    queryFn: fetchWeather,
    enabled: false ,
  });
   const handleSearch = () => {
    if (city) {
      refetch(); 
      setCity(city);
    }
  };
  return (
    <div>
      <p className="text-center font-bold text-4xl text-orange-400 mt-4">
        Weather App...
      </p>
      <div className="flex flex-col justify-center items-center border mx-44 my-64 gap-2 bg-slate-900 border-blue-500 rounded-2xl h-80 shadow-lg shadow-gray-500 hover:shadow-gray-200">
        <p
          className={`font-semibold text-xl mt-2 ${
            error ? "text-red-700" : "text-gray-400"
          }`}
        >
          {isError ? error.message : "ENTER CITY NAME..."}
        </p>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="border w-auto hover:bg-neutral-500 h-9 rounded-3xl px-3 border-blue-600"
        />
        <button
          onClick={handleSearch}
          className="text-red-100 border bg-transparent mt-4 px-3 py-1 font-normal text-xl rounded-3xl mb-3 border-blue-400 hover:bg-blue-900"
        >
          Search
        </button>

        {isLoading && (
          <div className="text-2xl text-white font-medium">Loading...</div>
        )}
        {data && (
          <>
            <p className="text-stone-400 font-medium">City: {data.name}</p>
            <p className="text-stone-400 font-medium">
              Temperature: {data.main.temp}
            </p>
            <p className="text-stone-400 font-medium">
              Description: {data.weather[0].description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
