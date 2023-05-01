<script>
    import { onMount } from "svelte";
    import { getUserData } from "../../../api/getUserData";
    import { getAllCategorie } from "../../../api/getAllCategorie";
    import { addLocation } from "../../../api/admin/addLocation.js";
    import { addCategorieToLocation } from "../../../api/admin/addCategorieToLocation.js";
    import NavBar from "../../../components/NavBar.svelte";

    let User;
    let Nom;
    let Description;
    let Categories;
    let error = "";
    let isCreated;
    let ActiveCategories = [];
    let Valide = "";

    //on vérifie si l'user est admin / et aussi connecter
    onMount( async() => {
        User = await getUserData();
        if(User === false){
            window.location.assign('/login');
        }else if(User.admin !== 1){
            window.location.assign('/user');
        }
        Categories = await getAllCategorie();
    })

    const toggleArrayElement = (array, element) => {
        const index = array.indexOf(element);
        if (index > -1) {
            array.splice(index, 1);
        } else {
            array.push(element);
        }
    };

    const sendData = async () => {
        error = "";
        var data = JSON.stringify({
            "nom": Nom,
            "description": Description
        });
        isCreated = await addLocation(data);
        if(isCreated === false){
            error = "Un Probléme est survenue vérifié les champs"
            return;
        }

        ActiveCategories.forEach(async element => {
            data = JSON.stringify({
                "id_location": isCreated.id,
                "id_categorie": element
            });
            await addCategorieToLocation(data);
        });

        Valide = "La location "+ Nom + " vient d'étre crée"
        Nom = "";
        Description = "";
        Categories = await getAllCategorie();
        ActiveCategories = [];
    }



</script>

<NavBar />
<div class="p-5">
    <h1>Formulaire création d'une nouvelle Location</h1>
    <p class="text-green-600 font-bold">{Valide}</p>
    <p class="text-red-600">{error}</p>

    <div class="my-2">
        <label for={Nom} class="block text-xs font-medium text-gray-700">
          Nom
        </label>
      
        <input
          type="text"
          bind:value={Nom}
          placeholder="Camping du ####"
          class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
        />
    </div>
    <div class="my-2">
        <label class="block text-xs font-medium text-gray-700 my-1" for={Description}>Message</label>

        <textarea
          class="w-full rounded-lg border-gray-200 p-3 text-sm"
          placeholder="Description du camping"
          rows="8"
          bind:value={Description}
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
            class="my-4 inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
            Envoyer
        </button>
</div>

  