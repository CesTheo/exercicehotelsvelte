import axios from 'axios';

export async function Logout() {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await axios.get(apiUrl+'/auth/logout', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
