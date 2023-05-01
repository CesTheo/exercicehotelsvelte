import axios from 'axios';

export async function getAllLocation(){
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(apiUrl+'/location', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error)
    throw error;
  }
}
