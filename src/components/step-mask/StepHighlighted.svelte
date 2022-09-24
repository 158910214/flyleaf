<script lang="ts">
	import { tick } from 'svelte'
	import { useRect } from '@/util/useRect'
	import { useGetDom } from '@/util/useGetDom'
	import Teleport from '../teleport/Teleport.svelte'
	import StepPopover from './StepPopover.svelte'

	export let dom
	export let gutter = 20
	export let curStep
	let style = ''

	// calc highlightedStyle
	$: {
		const curDom = useGetDom(dom)
		tick().then(async () => {
			if (!curDom) return console.log('can not find current dom')
			const { width, height, top, left } = useRect(curDom)
			if (
				!['hollow-position-relative', 'hollow-highlighted-element'].some(
					(cls) => curDom.className.split('').includes(cls)
				)
			) {
				curDom.className +=
					' hollow-position-relative hollow-highlighted-element '
			}
			await tick()
			style = [
				'width:' + Math.ceil(width) + 'px;',
				'height:' + Math.ceil(height) + 'px;',
				'top:' + (Math.ceil(top) - gutter) + 'px;',
				'left:' + (Math.ceil(left) - gutter) + 'px;',
				'border:' + gutter + 'px solid #fff;',
			].join('')
		})
	}

	// calc popoverStyle
	let popoverStyle = ''
	$: {
		const curDom = useGetDom(dom)
		tick().then(() => {
			if (!curDom) return console.log('can not find current dom')

			const { height, top, left } = useRect(curDom)
			popoverStyle = [
				'left:' + (Math.ceil(left) - gutter) + 'px;',
				'top:' + (Math.ceil(top) + Math.ceil(height) + gutter + 14) + 'px;',
			].join('')
		})
	}
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

<Teleport>
	<div class="fixed left-0 right-0 bottom-0 top-0 bg-op-60 z-3000 bg-black">
		<div
			class="fixed left-0 right-0 bottom-0 top-0 bg-op-60 z-3000 bg-black "
		/>
		<!-- driver-highlighted-element-stage -->
		<div class="pos-relative bg-white z-100005 border-rd-2px" {style} />
		{#if popoverStyle}
			<StepPopover
				style={popoverStyle}
				title={curStep.title}
				desc={curStep.title}
			/>
		{/if}
	</div>
</Teleport>
