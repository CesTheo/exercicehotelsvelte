<script>
  import { onMount } from "svelte";
  import { getUserData } from "../../api/getUserData";
  import { getAllLocation } from "../../api/getAllLocation";
  import { deleteLocation } from "../../api/admin/deleteLocation";
  import NavBar from "../../components/NavBar.svelte";
  import { getAllCategorie } from "../../api/getAllCategorie";
  import { deleteCategorie } from "../../api/admin/deleteCategorie";
  import { addCategorie } from "../../api/admin/addCategorie";

    let User;
    let Location;
    let Categories;
    let CategorieName;
    let ErrorCategorie = "";
    let Error = "";
    //on vérifie si l'user est admin
    onMount( async() => {
        User = await getUserData();
        if(User === false){
            window.location.assign('/login');
        }else if(User.admin !== 1){
            window.location.assign('/user');
        }
        Location = await getAllLocation();
        Categories = await getAllCategorie();
    })

    const DestroyLocation = async (id) => {
        await deleteLocation(id);
        Location = await getAllLocation();
    }

    const DestroyCategorie = async (id) => {
        await deleteCategorie(id);
        Categories = await getAllCategorie();
    }

    const NewCategorie = async () => {
        ErrorCategorie = "";
        var dataCategorie = JSON.stringify({
            "name": CategorieName
        });
        Error = true;
        Error = await addCategorie(dataCategorie);
        if(Error == false){
            ErrorCategorie = "Un problème est survenue"
        }
        Categories = await getAllCategorie();
    }


</script>
<NavBar />
{#if User}
<div>
    <h1 class="p-3 m-3">
        <span class="bg-blue-600 text-white text-4xl p-3 rounded">
            Espace Admin
        </span>
    </h1>
</div>

<div class="grid grid-cols-5">
    {#if Location}
    <div class="p-3 col-span-3">
        <a
            href="/admin/newLocation" 
            class="my-3 inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
            Ajouter une nouvelle locations <i class="ri-add-box-fill ri-xl"></i>
        </a>

        <h2 class="">Listes des locations</h2>
        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ID
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nom
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Catégories
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    
                </th>
                </tr>
            </thead>
        
            <tbody class="divide-y divide-gray-200">
                {#each Location as item}
                    <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {item.id}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center">{item.nom}</td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center max-w-[250px] overflow-auto">
                        {#each item.categories as categorie}
                            <span class="whitespace-nowrap rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm text-indigo-700 mx-1 capitalize">{categorie.nom}</span>
                        {/each}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center flex">
                        <div>
                            <a
                                href="/voyages/{item.id}"
                                target="_blank"
                            >
                                <i class="ri-eye-fill ri-xl text-blue-600 mx-2"></i>
                            </a>
                        </div>
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            on:click={() => DestroyLocation(item.id)}
                        >
                            <i class="ri-delete-bin-fill ri-xl text-red-600 mx-2"></i>
                        </div>
                        <div>
                            <a
                                href="/admin/modifLocation/{item.id}"
                            >
                                <i class="ri-pencil-fill ri-xl text-yellow-700 mx-2"></i>
                            </a>
                        </div>
                    </td>
                    </tr>
                {/each}
                    
                
            </tbody>
            </table>
        </div>

    </div>
    
    {/if}

    {#if Categories}
    <div class="p-3 col-span-2">
        <div class="my-2">
                <label class="block text-xs font-medium text-gray-700" for={CategorieName} >
                    Nom de la Catégorie
                </label>
                <input type="text" placeholder="Nouvelle Catégorie" bind:value={CategorieName} class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm">
        </div>
        <div>
            <p class="text-red-600">{ErrorCategorie}</p>
        </div>
        <button
            on:click={() => NewCategorie()}
            class="my-3 inline-block rounded border border-green-600 bg-green-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring active:text-green-500">
            Ajouter une nouvelle Catégories <i class="ri-add-box-fill ri-xl"></i>
        </button>


        <h2 class="">Listes des Catégories</h2>
        <div class="overflow-x-auto rounded-lg border border-gray-200">
            <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead class="ltr:text-left rtl:text-right">
                <tr>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    ID
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Nom
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    Catégories
                </th>
                <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    
                </th>
                </tr>
            </thead>
        
            <tbody class="divide-y divide-gray-200">
                {#each Categories as item}
                    <tr>
                    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">
                        {item.id}
                    </td>
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center capitalize">{item.nom}</td>
                    
                    <td class="whitespace-nowrap px-4 py-2 text-gray-700 text-center justify-center flex">
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            on:click={() => DestroyCategorie(item.id)}
                        >
                            <i class="ri-delete-bin-fill ri-xl text-red-600 mx-2"></i>
                        </div>
                    </td>
                    </tr>
                {/each}
                    
                
            </tbody>
            </table>
        </div>

    </div>
    
    {/if}
</div>
{/if}