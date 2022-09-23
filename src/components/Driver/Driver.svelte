<script lang="ts">
	import { onMount } from 'svelte'
	import { useRect, useDocumentRect } from '@/util/useRect'
	import Teleport from '../teleport/Teleport.svelte'
	import ToolTip from '../tooltip/Tooltip.svelte'
	import { tick } from 'svelte'

	export let show = false
	export let dom = null
	export let gutter = 20
	interface Popover {
		title?: string
		desc?: string
	}
	export let popover: Popover = {}

	let highlightedStyle = ''
	let popoverItemStyle = ''

	const initDom = async () => {
		if (dom) {
			const curDom = typeof dom === 'string' ? document.querySelector(dom) : dom
			const { width, height, top, left } = useRect(curDom)
			const bdTop = Math.ceil(top)
			if (!curDom) {
				show = false
				return console.log('can not find current dom')
			}
			if (
				!['hollow-position-relative', 'hollow-highlighted-element'].some(
					(cls) => curDom.className.split('').includes(cls)
				)
			) {
				curDom.className +=
					'hollow-position-relative hollow-highlighted-element '
			}
			await tick()

			highlightedStyle = [
				'width:' + Math.ceil(width) + 'px;',
				'height:' + Math.ceil(height) + 'px;',
				'top:' + (bdTop - gutter) + 'px;',
				'left:' + (Math.ceil(left) - gutter) + 'px;',
				'border:' + gutter + 'px solid #fff;',
			].join('')

			await tick()

			popoverItemStyle = [
				'left:' + (Math.ceil(left) - gutter) + 'px;',
				'top:' + (bdTop + Math.ceil(height) + 14) + 'px;',
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
	<div class="fixed left-0 right-0 bottom-0 top-0 bg-op-60 z-3000 bg-black">
		<div
			class="fixed left-0 right-0 bottom-0 top-0 bg-op-60 z-3000 bg-black "
		/>
		<!-- driver-highlighted-element-stage -->
		<div
			class="pos-relative bg-white z-100005 border-rd-2px"
			style={highlightedStyle}
		/>
		{#if popoverItemStyle}
			<div
				class="driver-popover-item pos-absolute bg-white border-rd-5px p-15px min-w-250px max-w-300px z-1000000000 shadow-black"
				style={popoverItemStyle}
			>
				<div
					class="driver-popover-tip pos-absolute top--10px border-transparent border-b-white border-5px content-empty"
				/>
				{#if popover.title}
					<div class="driver-popover-title mb-5px text-20px">
						{popover.title}
					</div>
				{/if}
				<div class="driver-popover-description text-14px font-400">
					<slot>
						{popover.desc || ''}
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
		{/if}
	</div>
</Teleport>
