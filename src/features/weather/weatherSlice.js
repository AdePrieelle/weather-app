import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  city: null,
  country: null,
  temperatureUnits: 'Celcius',
  latitude: null,
  longitude: null,
  weatherData: null,
  statusFetchCity: 'idle',
  statusLatitudeLongitude: 'idle',
  statusFetchCityAndLatitudeLongitude: 'idle',
  errorFetchCity: null,
  errorFetchLatitudeLongitude: null,
  errorFetchCityAndLatitudeLongitude: null
};

const apiKey = process.env.REACT_APP_API_KEY;

export const fetchCity = createAsyncThunk('weather/fetchCity', async(city) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error('City not found');
  }
  return responseData;
})

export const fetchLatitudeLongitude = createAsyncThunk('weather/fetchLatitudeLongitude', async({latitude, longitude}) => {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${apiKey}`);
  const responseData = await response.json();
  console.log(responseData);
  if (!response.ok) {
    throw new Error(responseData.message);
  }
  return responseData;
})

export const fetchCityAndLatitudeLongitude = createAsyncThunk('weather/fetchCityAndLatitudeLongitude', async(city, { dispatch, getState }) => {
  await dispatch(fetchCity(city));
  if (getState().weather.errorFetchCity !== null) {
    throw new Error(getState().weather.errorFetchCity);
  }
  const latitude = getState().weather.latitude;
  const longitude = getState().weather.longitude;
  console.log(latitude, longitude);
  await dispatch(fetchLatitudeLongitude({latitude, longitude}));
  if (getState().weather.errorFetchLatitudeLongitude !== null) {
    throw new Error(getState().weather.errorLatitudeLongitude);
  }
})


const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    switchTemperatureUnits(state, action) {
      if (state.temperatureUnits === 'Celcius') {
        state.temperatureUnits = 'Fahrenheit'
      } else {
        state.temperatureUnits = 'Celcius'
      }
    }
  },
  extraReducers: {
    [fetchCity.pending]: (state, action) => {
      state.statusFetchCity = 'loading'
      state.errorFetchCity = null;
    },
    [fetchCity.fulfilled]: (state, action) => {
      state.statusFetchCity = 'succeeded';
      state.latitude = action.payload.coord.lat;
      state.longitude = action.payload.coord.lon;
      state.city = action.payload.name;
      state.country = action.payload.sys.country;

    },
    [fetchCity.rejected]: (state, action) => {
      state.statusFetchCity = 'failed'
      state.errorFetchCity = action.error.message
    },


    [fetchLatitudeLongitude.pending]: (state, action) => {
      state.statusLatitudeLongitude = 'loading'
      state.errorFetchLatitudeLongitude = null;
    },
    [fetchLatitudeLongitude.fulfilled]: (state, action) => {
      state.statusLatitudeLongitude = 'succeeded';
      state.weatherData = action.payload;
    },
    [fetchLatitudeLongitude.rejected]: (state, action) => {
      state.statusLatitudeLongitude = 'failed'
      state.errorFetchLatitudeLongitude = action.error.message
    },

    [fetchCityAndLatitudeLongitude.pending]: (state, action) => {
      state.statusFetchCityAndLatitudeLongitude = 'loading'
      state.errorFetchCityAndLatitudeLongitude = null;
    },
    [fetchCityAndLatitudeLongitude.fulfilled]: (state, action) => {
      state.statusFetchCityAndLatitudeLongitude = 'succeeded';
    },
    [fetchCityAndLatitudeLongitude.rejected]: (state, action) => {
      state.statusFetchCityAndLatitudeLongitude = 'failed'
      state.errorFetchCityAndLatitudeLongitude = action.error.message
    },
  }
})

export const { switchTemperatureUnits } = weatherSlice.actions;

export default weatherSlice.reducer;
