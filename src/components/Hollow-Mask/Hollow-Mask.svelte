<script lang="ts">
	import { onMount } from 'svelte'
	import { useRect, useDocumentRect } from '@/util/useRect'
	import Teleport from '../teleport/Teleport.svelte'
	import ToolTip from '../tooltip/Tooltip.svelte'
	import { tick } from 'svelte'

	export let show = false
	export let dom = null
	export let gutter = 20

	let highlightedStyle = ''

	const initDom = async () => {
		if (dom) {
			const curDom = typeof dom === 'string' ? document.querySelector(dom) : dom
			const { width, height, top, left } = useRect(curDom)
			const bdTop = Math.ceil(top)
			if (!curDom) {
				show = false
				return console.log('can not find current dom')
			}
			console.log(bdTop)
			console.log(Math.ceil(left))
			if (
				!['hollow-position-relative', 'hollow-highlighted-element'].some(
					(cls) => curDom.className.split('').includes(cls)
				)
			) {
				curDom.className +=
					'hollow-position-relative hollow-highlighted-element '
			}
			highlightedStyle = [
				'width:' + Math.ceil(width) + 'px;',
				'height:' + Math.ceil(height) + 'px;',
				'top:' + (bdTop - gutter) + 'px;',
				'left:' + (Math.ceil(left) - gutter) + 'px;',
				'border:' + gutter + 'px solid #fff;',
			].join('')
		}
	}

	$: if (dom && show === true) {
		initDom()
	}
	onMount(() => show === true && initDom())
</script>

<svelte:head>
	<style>
		.hollow-highlighted-element {
			z-index: 100004 !important;
		}
		.hollow-position-relative {
			position: relative !important;
		}
	</style>
</svelte:head>

<!-- driver-page-overlay -->
<Teleport>
	<div class="fixed left-0 right-0 bottom-0 top-0 bg-op-80 z-3000 bg-black">
		<div
			class="fixed left-0 right-0 bottom-0 top-0 bg-op-80 z-3000 bg-black "
		/>
		<!-- driver-highlighted-element-stage -->
		<div class="pos-relative bg-white z-1000005" style={highlightedStyle} />
	</div>
</Teleport>
