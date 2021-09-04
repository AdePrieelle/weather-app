// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const axios = require('axios');

const handler = async (event) => {
  try {
    const latitude = event.queryStringParameters.latitude || 51.5085;
    const longitude = event.queryStringParameters.longitude || 0.1257;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const urlLatitudeLongitude = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
    const { data } = await axios.get(urlLatitudeLongitude);
    
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
