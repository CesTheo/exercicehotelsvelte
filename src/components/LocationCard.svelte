<script>
    export let name;
    export let description;
    export let categories;
    export let link = false;
    export let id = 0;


</script>

<div class="block rounded-lg p-4 shadow-sm shadow-indigo-100">
    <img
      alt="Home"
      src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
      class="h-56 w-full rounded-md object-cover"
    />
  
    <div class="mt-2">
    <div>
        <dd class="font-medium">{name}</dd>
    </div>
    <div>
        <p class="text-sm text-gray-500">{description}</p>
    </div>
    {#each categories as categorie}
        <span
        class="whitespace-nowrap rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-700 capitalize mx-1"
        >   
            {categorie.nom}
        </span>
    {/each}
    {#if link}
        <div class="my-3">
            <a
                href="/voyages/{id}"
                class="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
            En savoir plus
            </a>
        </div>
    {/if}
    </div>
</div>