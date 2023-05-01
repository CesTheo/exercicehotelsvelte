import axios from 'axios';

export async function addLocation(data){
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(apiUrl+'/location/create', data,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      },
    });
    return (response.data);
  } catch (error) {
    // console.log(error)
    return false
  }
}
