<script lang="ts">
  import { onMount } from "svelte";
  import { currentUser, pb } from "./pocketbase";
  import Filter from "bad-words";

  const filter = new Filter();

  let newMessage: string;
  let messages: any = [];
  let unsubscribe: () => void;

  onMount(async () => {
    // Get initial messages
    const resultList = await pb.collection("messages").getList(1, 50, {
      sort: "created",
      expand: "user",
    });
    messages = resultList.items;

    // Subscribe to realtime messages
    unsubscribe = await pb
      .collection("messages")
      .subscribe(
        "*",
        async ({ action, record }: { action: any; record: any }) => {
          console.log(action, record);
          if (action === "create") {
            // Fetch associated user
            const user = await pb.collection("users").getOne(record.user);
            record.expand = { user };
            messages = [...messages, record];
          }
          if (action === "delete") {
            messages = messages.filter((m: any) => m.id !== record.id);
          }
        }
      );
  });

  async function sendMessage() {
    if ($currentUser) {
      const data = {
        text: filter.clean(newMessage),
        user: $currentUser.id,
      };
      const createdMessage = await pb.collection("messages").create(data);
      newMessage = "";
    }
  }
</script>

<div
  class="h-screen w-screen flex flex-col justify-center items-center relative"
>
  <!-- {#each messages as message (message.id)}
    <div class="message">
      <img
        class="avatar"
        src={`https://avatars.dicebear.com/api/identicon/${message.expand?.user?.username}.svg`}
        alt="avatar"
        width="40px"
      />
      <div>
        <small class="text-sm">
          Sent by @{message.expand?.user?.username}
        </small>
        <p class="text-base">{message.text}</p>
      </div>
    </div>
  {/each} -->

  {#if $currentUser}
    <form on:submit|preventDefault={sendMessage}>
      <input placeholder="Message" type="text" bind:value={newMessage} />
      <button type="submit">Send</button>
    </form>
  {/if}
</div>
