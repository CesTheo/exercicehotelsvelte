import axios from 'axios';

export async function getAllCategorie() {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(apiUrl+'/categorie/all', {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
}
