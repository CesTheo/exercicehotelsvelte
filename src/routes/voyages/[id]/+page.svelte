<script>
    import { onMount } from "svelte";
    import { getLocation } from '../../../api/getLocation.js';
  import Calendar from "../../../components/Calendar.svelte";
  import NavBar from "../../../components/NavBar.svelte";
  import LocationCard from "../../../components/LocationCard.svelte";

    export let data;

    var Location;

    onMount(async () => {
        Location = await getLocation(data.id)
    });

</script>

<NavBar />
{#if Location}
    <LocationCard name={Location.nom} description={Location.description} categories={Location.categories} />
    <div class="block rounded-lg p-4 shadow-sm shadow-indigo-100">
        <h2>Réservation</h2>
        <Calendar />
    </div>
{/if}