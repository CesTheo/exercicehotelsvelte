<script>
  import { getUserData } from "../../api/getUserData";
  import { onMount } from "svelte";
  import NavBar from "../../components/NavBar.svelte";


  let User;

  onMount( async() => {
        User = await getUserData();
        if(User === false){
            window.location.assign('/login');
        }
    })
</script>
<NavBar />
{#if User}
  <div class="mx-auto w-full px-4 py-8 sm:px-6 lg:px-8 bg-gray-100">
    <div class="flex items-center sm:justify-between sm:gap-4">
      <div class="mt-2">
        <h1 class="text-2xl font-bold text-gray-700 sm:text-3xl">
          Bonjour, {User.prenom} !
        </h1>
        {#if User.admin}
          <p class="my-2">Vous étes admin sur la plateforme,</p>
          <a
            href="/admin"
            class="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >Admin Espace</a
          >
        {/if}
      </div>
      <div
        class="flex-1 items-center justify-between gap-8 sm:justify-end hidden sm:flex"
      >
        <button
          type="button"
          class="group flex shrink-0 items-center rounded-lg transition"
        >
          <span class="sr-only">Menu</span>
          <!-- svelte-ignore a11y-img-redundant-alt -->
          <img
            alt="Profile picture"
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            class="h-10 w-10 rounded-full object-cover"
          />

          <p class="ms-2 hidden text-left text-xs sm:block">
            <strong class="block font-medium">{User.prenom} {User.nom}</strong>

            <span class="text-gray-500"> {User.email} </span>
          </p>
        </button>
      </div>
    </div>
  </div>

  <section>
    <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div class="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-xl text-center">
            <h2 class="text-2xl font-bold text-white md:text-3xl">
              Découvrez notre application de réservation de voyage
            </h2>

            <p class="hidden text-white/90 sm:mt-4 sm:block">
              Découvrez notre application de réservation de voyage, votre
              compagnon idéal pour planifier vos aventures. Avec une interface
              conviviale, explorez des destinations inspirantes et réservez
              facilement vos vols, hôtels et activités. Profitez de suggestions
              personnalisées, suivez vos itinéraires en temps réel et partagez
              vos expériences. Laissez-nous vous accompagner vers des voyages
              inoubliables !
            </p>

            <div class="mt-4 md:mt-8">
              <a
                href="/voyages"
                class="inline-block rounded border border-white bg-white px-12 py-3 text-sm font-medium text-blue-500 transition hover:bg-transparent hover:text-white focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Réservez votre voyage
              </a>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
          <img
            alt="Student"
            src="https://images.unsplash.com/photo-1621274790572-7c32596bc67f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=654&q=80"
            class="h-40 w-full object-cover sm:h-56 md:h-full"
          />

          <img
            alt="Student"
            src="https://images.unsplash.com/photo-1567168544813-cc03465b4fa8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            class="h-40 w-full object-cover sm:h-56 md:h-full"
          />
        </div>
      </div>
    </div>
  </section>
{/if}
