import axios from 'axios';

export async function getUserData() {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(apiUrl+'/auth/user', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    });

    return response.data;
  } catch (error) {
    return false;
    throw error;
  }
}
