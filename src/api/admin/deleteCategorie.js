import axios from 'axios';

export async function deleteCategorie(id){
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(apiUrl+'/categorie/delete/'+id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    });
    // console.log(response.data)
    return response.data;
  } catch (error) {
    // console.log(error)
    throw error;
  }
}
