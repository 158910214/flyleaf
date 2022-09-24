<script lang="ts">
	import StepHighlighted from './StepHighlighted.svelte'

	export let steps = []
	export let defaultStepIndex = 0
	export let gutter = 20
	export let show = false

	// 当前状态
	let curIndex = 0
	if (defaultStepIndex) curIndex = defaultStepIndex

	$: curStep = steps[curIndex]
</script>

{#if show}
	<StepHighlighted dom={curStep.dom} {gutter} {curStep} />
{/if}
