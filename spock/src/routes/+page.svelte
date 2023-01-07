<script lang="ts">
  import Navbar from "$lib/Navbar.svelte";
  import Login from "../lib/Login.svelte";
  import Messages from "../lib/Messages.svelte";
  import { currentUser } from "../lib/pocketbase";
</script>

<!-- <Navbar /> -->
<div
  class="h-screen w-screen flex flex-col justify-center items-center relative"
>
  <Login />
  {#if $currentUser}
    <Messages />
  {/if}
</div>
