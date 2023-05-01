<script>
    import { onMount } from "svelte";
    import { getUserData } from "../../../../api/getUserData";
    import { getLocation } from "../../../../api/getLocation";
    import { getAllCategorie } from "../../../../api/getAllCategorie";
    import { modifyLocation } from "../../../../api/admin/modifyLocation";
    import { resetCategorieToLocation } from "../../../../api/admin/resetCategorieToLocation";
    import { addCategorieToLocation } from "../../../../api/admin/addCategorieToLocation";
    import NavBar from "../../../../components/NavBar.svelte";

    export let data;
    let User;
    let Location;
    let ActiveCategories = [];
    let Categories;
    let error = "";
    let isError3 = "";
    let dataSend2;
    let Valide = "";

    const toggleArrayElement = (array, element) => {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        } else {
            array.push(element);
        }
    };

    //on vérifie si l'user est admin / et aussi connecter
    onMount( async() => {
        User = await getUserData();
        if(User === false){
            window.location.assign('/login');
        }else if(User.admin !== 1){
            window.location.assign('/user');
        }

        // Reprendres les catégories existante
        Location = await getLocation(data.id)
        Categories = await getAllCategorie();

        let alreadyCategories = [];
        Location.categories.forEach(element => {
            alreadyCategories.push(element.id)
        });
        ActiveCategories = alreadyCategories;
    })

    const sendData = async () => {

        //MODIFICATION API
        var dataSend = JSON.stringify({
            "id" : data.id,
            "nom": Location.nom,
            "description": Location.description,
        });

        var IsError = await modifyLocation(dataSend)
        if(IsError == false){
            error = "Il y a un problème avec le champs du nom et/ou de la description"
            return;
        }

        // RESET CATEGORIE

        var IsError2 = await resetCategorieToLocation(data.id)
        if(IsError2 == false){
            error = "Il y a un problème avec les catégories"
            return;
        }


        //SEND NEW CATEGORIE


        ActiveCategories.forEach(async element => {
            dataSend2 = JSON.stringify({
                "id_location": data.id,
                "id_categorie": element
            });
            isError3 = await addCategorieToLocation(dataSend2);
            if(isError3 == false){
                error = "Il y a un problème avec les catégories"
                return;
            }
        });

        Valide = "Modification effectué"
    }

</script>

<NavBar />
{#if Location}
    <div>
        <div class="p-5">
            <h1>Formulaire de modification d'une nouvelle Location</h1>
            <p class="text-green-600 font-bold">{Valide}</p>
            <p class="text-red-600">{error}</p>
        
            <div class="my-2">
                <label for={Location.nom} class="block text-xs font-medium text-gray-700">
                  Nom
                </label>
              
                <input
                  type="text"
                  bind:value={Location.nom}
                  placeholder="Camping du ####"
                  class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
                />
            </div>
            <div class="my-2">
                <label class="block text-xs font-medium text-gray-700 my-1" for={Location.description}>Message</label>
        
                <textarea
                  class="w-full rounded-lg border-gray-200 p-3 text-sm"
                  placeholder="Location.description du camping"
                  rows="8"
                  bind:value={Location.description}
                ></textarea>
            </div>

        
            {#if Categories}
                <p class="block text-xs font-medium text-gray-700 my-1">Catégories</p>
                <div class="grid grid-cols-4 gap-2">
                {#each Categories as Categorie}
                    <div class="w-full rounded border border-gray-200 bg-white">
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
                    
                    </div>
                {/if}
            
                <button 
                    on:click={() => sendData()}
                    class="my-4 inline-block rounded border border-yellow-600 bg-yellow-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-yellow-600 focus:outline-none focus:ring active:text-yellow-500">
                    Modifier
                </button>
            </div>
        
    </div>
{/if}


<!-- checked={ActiveCategories.includes(Categorie.id)}
on:change={() => toggleArrayElement(ActiveCategories, Categorie.id)}
on:click={() => sendData()} -->
