import axios from 'axios';

export async function addCategorie(data){
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(apiUrl+'/categorie/create/', data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error)
    return false;
  }
}
