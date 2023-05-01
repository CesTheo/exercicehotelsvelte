import axios from 'axios';

export async function addCategorieToLocation(data){
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.post(apiUrl+'/categorie/add', data,{
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
