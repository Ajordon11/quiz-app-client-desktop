<script>
  export let steps = []; // Array of step labels
  export let currentStep = 0; // Current active step (0-based index)

  const goToStep = (index) => {
    if (index >= 0 && index < steps.length) {
      currentStep = index;
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      currentStep++;
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      currentStep--;
    }
  };
</script>

<style>
  /* Optional custom styles for smoother animations */
  .step-indicator {
    transition: all 0.3s ease-in-out;
  }
</style>

<div class="flex flex-col items-center w-full">
  <!-- Stepper -->
  <div class="flex items-center w-full mb-6">
    {#each steps as step, index}
      <div class="flex items-center w-full {index === 0 ? 'ml-52' : ''}">
        <!-- Step Indicator -->
        <div
          class="step-indicator flex items-center justify-center w-10 h-10 text-white font-bold rounded-full
          {index <= currentStep ? 'bg-indigo-500' : 'bg-gray-300'}"
        >
          {index + 1}
        </div>

        <!-- Step Label -->
        <div class="flex-1">
          <p
            class="ml-4 text-sm font-medium
            {index <= currentStep ? 'text-indigo-600' : 'text-gray-500'}"
          >
            {step}
          </p>
        </div>

        <!-- Line between steps -->
        {#if index < steps.length - 1}
          <div
            class="h-1 w-full bg-gray-300 mx-5 {index < currentStep ? 'bg-indigo-500' : ''} transition-all"
          ></div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Navigation Buttons -->
  <!-- <div class="flex justify-between w-full max-w-3xl mt-4">
    <button
      class="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-lg hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      on:click={previousStep}
      disabled={currentStep === 0}
    >
      Previous
    </button>
    <button
      class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 rounded-lg hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
      on:click={nextStep}
      disabled={currentStep === steps.length - 1}
    >
      Next
    </button>
  </div> -->
</div>
