<script>
  import { onMount } from 'svelte';

  // Name to display
  export let firstPlayerName = "Floating Name";

  let floatingElement;

  onMount(() => {
    const element = floatingElement;
    const speed = 1.5; // Speed of movement
    const boundary = { x: window.innerWidth - 50, y: window.innerHeight - 50 };

    let position = { x: Math.random() * boundary.x, y: Math.random() * boundary.y };
    let velocity = { x: speed, y: speed };

    const moveElement = () => {
      position.x += velocity.x;
      position.y += velocity.y;

      // Reverse direction if hitting the boundary
      if (position.x <= 0 || position.x >= boundary.x - element.offsetWidth) velocity.x *= -1;
      if (position.y <= 0 || position.y >= boundary.y - element.offsetHeight) velocity.y *= -1;

      element.style.transform = `translate(${position.x}px, ${position.y}px)`;

      requestAnimationFrame(moveElement);
    };

    moveElement();

    // Update boundaries on resize
    const resizeListener = () => {
      boundary.x = window.innerWidth;
      boundary.y = window.innerHeight;
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  });
</script>

<style>
  .floating {
    position: absolute;
    user-select: none;
    pointer-events: none;
  }
</style>

<div class="relative w-screen h-screen overflow-hidden">
  <div
    bind:this={floatingElement}
    class="floating text-5xl font-bold text-purple-500 bg-white rounded-lg px-4 py-2 shadow-lg"
  >
    {firstPlayerName}
  </div>
</div>
