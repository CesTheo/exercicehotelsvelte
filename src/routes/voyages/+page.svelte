<script>
    import { onMount } from "svelte";
    import { getAllLocation } from "../../api/getAllLocation";
    import { getAllCategorie } from "../../api/getAllCategorie";
    import NavBar from "../../components/NavBar.svelte";
    import LocationCard from "../../components/LocationCard.svelte";


    let Voyages;
    let Categories;
    let ActiveCategories = [];

    onMount(async () => {
        Voyages = await getAllLocation();
        Categories = await getAllCategorie();
    });

    const toggleArrayElement = (array, element) => {
  const index = array.indexOf(element);
  if (index > -1) {
    array.splice(index, 1);
  } else {
    array.push(element);
  }
  filteredVoyages = filterVoyagesByCategories();
};

function filterVoyagesByCategories() {
  if (ActiveCategories.length === 0) {
    return Voyages;
  } else {
    return Voyages.filter((voyage) => {
      return ActiveCategories.every((categoryId) => {
        return voyage.categories.some((categorie) => {
          return categorie.id === categoryId;
        });
      });
    });
  }
}

let filteredVoyages = filterVoyagesByCategories();


</script>

<NavBar />
<div>

<div class="flex gap-8 m-4">
    <div>
        <h1 class="font-bold">Catégories</h1>
    </div>
    <div class="relative">
      <details class="group [&_summary::-webkit-details-marker]:hidden">
        <summary
          class="flex cursor-pointer items-center gap-2 border-b border-gray-400 pb-1 text-gray-900 transition hover:border-gray-600"
        >
          <span class="text-sm font-medium"> Catégorie </span>
  
          <span class="transition group-open:-rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="h-4 w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </span>
        </summary>
        <div
        class="z-50 group-open:absolute group-open:start-0 group-open:top-auto group-open:mt-2"
        >
        {#if Categories}
            {#each Categories as Categorie}
                <div class="w-96 rounded border border-gray-200 bg-white">
                    <ul class="space-y-1 border-t border-gray-200 p-4">
                    <li>
                        <label for={Categorie.id} class="inline-flex items-center gap-2">
                            <input
                              type="checkbox"
                              id={Categorie.id}
                              checked={ActiveCategories.includes(Categorie.id)}
                              on:change={() => toggleArrayElement(ActiveCategories, Categorie.id)}
                              class="h-5 w-5 rounded border-gray-300"
                            />
                                  
                            <span class="text-sm font-medium text-gray-700 capitalize">
                              {Categorie.nom}
                            </span>
                          </label>
                          
                    </li>
                    </ul>
                </div>
                {/each}
            {/if}
        </div>
      </details>
    </div>
  </div>
</div>
{#if Voyages}
    <div class="w-full grid grid-cols-2 gap-5">
        
        {#if filteredVoyages}
            {#each filteredVoyages as Voyage}
                <LocationCard name={Voyage.nom} description={Voyage.description} categories={Voyage.categories} link={true} id={Voyage.id} />
            {/each}
        {:else}
            {#each Voyages as Voyage}
                <LocationCard name={Voyage.nom} description={Voyage.description} categories={Voyage.categories} link={true} id={Voyage.id} />
            {/each}
        {/if}
    </div>
{/if}
