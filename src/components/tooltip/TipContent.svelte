<script lang="ts">
	import { onMount } from 'svelte'
	import { useRect } from '../../util/useRect'
	import {
		DEFAULT_PLACEMENT,
		getPlacementDict,
		getPlacementLabel,
	} from './TipConfig'

	import Teleport from '../teleport/Teleport.svelte'
	import Arrow from './TipArrow.svelte'

	export let bodyEl = null
	export let placement = DEFAULT_PLACEMENT

	let contentEl
	let contentStyle
	let teleportDisable = true
	let bodyElCopy, contentElCopy

	const PLACEMENT_DICT = getPlacementDict()
	$: contentClass = [
		'tooltip-content',
		getPlacementLabel(placement, PLACEMENT_DICT),
	].join(' ')

	onMount(() => {
		bodyElCopy = useRect(bodyEl)
		contentElCopy = useRect(contentEl)
		contentStyle = PLACEMENT_DICT[placement].getRect(bodyElCopy, contentElCopy)
		if (contentStyle) teleportDisable = false
	})
</script>

<Teleport disabled={teleportDisable}>
	<div bind:this={contentEl} style={contentStyle} class={contentClass}>
		<slot />
		<Arrow {placement} />
	</div>
</Teleport>

<style lang="scss">
	.tooltip-content {
		z-index: 2001;
		position: absolute;
		padding: 5px 10px;
		border: 1px solid #0d0d0d;
		background-color: #fff;
		border-radius: 10px;
		word-wrap: break-word;
	}
	.hidden {
		visibility: hidden;
	}
</style>
