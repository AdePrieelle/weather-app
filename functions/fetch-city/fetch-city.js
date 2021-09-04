// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');

const handler = async (event) => {
  try {
    const city = event.queryStringParameters.city || 'London';
    const API_KEY = process.env.REACT_APP_API_KEY;
    const urlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const { data } = await axios.get(urlCity);
    
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    }
  } catch (error) {
    const { status, statusText, headers, data } = error.response;
    
    return {
      statusCode: status,
      body: JSON.stringify({status, statusText, headers, data})
    }
  }
}

module.exports = { handler }
