<script lang="ts">
	export let style = ''
	export let title = ''
	export let desc = ''
</script>

<div
	class="driver-popover-item pos-absolute bg-white border-rd-5px p-15px min-w-250px max-w-300px z-1000000000 shadow-black"
	{style}
>
	<div
		class="driver-popover-tip pos-absolute top--10px border-transparent border-b-white border-5px content-empty"
	/>
	{#if title}
		<div class="driver-popover-title mb-5px text-20px">
			{title}
		</div>
	{/if}
	<div class="driver-popover-description text-14px font-400">
		<slot>
			{desc}
		</slot>
	</div>
	<div class="driver-popover-footer mt-10px flex space-between">
		<button>Close</button>
		<div class="flex-1 text-right">
			<button>← Previous</button>
			<button>Okay, Start!</button>
		</div>
	</div>
</div>
