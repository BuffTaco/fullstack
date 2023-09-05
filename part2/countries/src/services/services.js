import axios from 'axios'

const baseUrl ="https://studies.cs.helsinki.fi/restcountries/api/all"

const getAll = () => {
    return axios.get(baseUrl)
}
const call = (country) => {
    const lat = country.latlng[0];
    const lon = country.latlng[1];
    const time = country.timezones[0].substring(0,3);
    
    return axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=${time}`);
    
}





export default {getAll, call}