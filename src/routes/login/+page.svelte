<script>
    import axios from 'axios';
    import NavBar from '../../components/NavBar.svelte';
    import { navigate } from 'svelte-routing';

    var email = "";
    var password = "";

    async function loginUser() {

        var data = JSON.stringify({
            "email": email,
            "password": password
        });

        var config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/auth',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios(config);
            // console.log(response.data);
            sessionStorage.setItem('token', response.data.access_token)
            // navigate('/user')
            window.location.assign('/user');
        } catch (error) {
            // console.log(error);
        }
    }
</script>
<NavBar />
<div class="h-screen flex flex-col justify-center align-middle">
    <div class="w-[50%] mx-auto">
        <div class="my-3 text-center text-3xl text-gray-700">
            <h1>Page de connexion</h1>
        </div>
        <div class="my-3">
            <label for="UserEmail" class="block text-xs font-medium text-gray-700">
              Email
            </label>
          
            <input
              type="email"
              id="UserEmail"
              bind:value={email}
              placeholder="john@doe.com"
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
        </div>
        <div class="my-3">
            <label for="UserEmail" class="block text-xs font-medium text-gray-700">
              Mot de passe
            </label>
          
            <input
              type="password"
              id="UserPassword"
              bind:value={password}
              placeholder="***********"
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
        </div>
        <div
            class="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            on:click={loginUser}
            on:keypress={loginUser}
            >
            Connexion
        </div>
    </div>
</div>
  