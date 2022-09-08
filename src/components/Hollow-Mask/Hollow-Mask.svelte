<script lang="ts">
	import { onMount } from 'svelte'
	import { useRect, useDocumentRect } from '@/util/useRect'
	import Teleport from '../teleport/Teleport.svelte'
	import ToolTip from '../tooltip/Tooltip.svelte'

	export let show = false
	export let dom = null
	export let gutter = 20

	let HollowWrapEl
	let style = ''
	let cntStyle = ''
	let cloneNodeArea
	let curChild = null

	const initDom = () => {
		if (dom) {
			const curDom = typeof dom === 'string' ? document.querySelector(dom) : dom
			const { width, height, top, left } = useRect(curDom)
			console.log(width, height, top, left)
			const bdTop = Math.ceil(top)
			if (!curDom) {
				show = false
				return console.log('can not find current dom')
			}
			if (!cloneNodeArea) {
				show = false
				return console.log('can not find cloneNodeArea')
			}
			if (!curChild) {
				curChild = curDom.cloneNode(true)
				cloneNodeArea.appendChild(curChild)
			}
			style = [
				'width:' + Math.ceil(width) + 'px;',
				'height:' + Math.ceil(height) + 'px;',
				'top:' + bdTop + 'px;',
				'left:' + Math.ceil(left) + 'px;',
				'border:' + gutter + 'px solid #fff;',
			].join('')
			cntStyle = [
				'top:' + (height + bdTop + gutter * 2 + 10) + 'px;',
				'left:' + (Math.ceil(left) + gutter) + 'px;',
			].join('')
		}
	}

	$: if (dom && show === true && cloneNodeArea) {
		initDom()
	}
	onMount(() => show === true && initDom())
</script>

{#if show}
	<Teleport>
		<div class="hollow-mask" pos-fixed left-0 right-0 bottom-0 top-0>
			<div pos-fixed left-0 right-0 bottom-0 top-0 bg-op-50 z-3000 bg-black />
			<div pos-fixed z-3001 bg-white bind:this={HollowWrapEl} {style}>
				<ToolTip alwaysShow={true}>
					<div bind:this={cloneNodeArea} />
					<div slot="content" bg-white>
						<slot />
					</div>
				</ToolTip>
			</div>
		</div>
	</Teleport>
{/if}
