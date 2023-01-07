<script lang="ts">
  import { currentUser, pb } from "./pocketbase";

  let username: string;
  let password: string;

  async function login() {
    await pb.collection("users").authWithPassword(username, password);
  }

  async function signUp() {
    try {
      const data = {
        username,
        password,
        passwordConfirm: password,
        name: username,
      };

      const createdUser = await pb.collection("users").create(data);
      await login();
    } catch (err) {
      console.log(err);
    }
  }

  function signOut() {
    pb.authStore.clear();
  }
</script>

{#if $currentUser}
  <div
    class="h-screen w-screen flex flex-col justify-center items-center relative"
  >
    <p>Signed in as {$currentUser.username}</p>
    <button class="btn btn-primary" on:click={signOut}>Sign Out</button>
  </div>
{:else}
  <div class="text-7xl text-center">PocketChat</div>
  <div class="p-1" />
  <div class="" />
  <form class="flex justify-center" on:submit|preventDefault>
    <input
      placeholder="Username"
      type="text"
      class="input input-bordered w-full max-w-xs"
      bind:value={username}
    />
    <input
      placeholder="Password"
      type="password"
      class="input input-bordered w-full max-w-xs"
      bind:value={password}
    />
  </form>
  <div class="p-1" />
  <button
    class="flex justify-center btn btn-primary w-full max-w-xs"
    on:click={signUp}>Sign up</button
  >
  <div class="p-1" />
  <button
    class="flex justify-center btn btn-primary w-full max-w-xs"
    on:click={login}>Log in</button
  >
  <!-- </div> -->
{/if}
