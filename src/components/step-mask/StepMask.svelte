<!-- inspired by https://blog.csdn.net/oliver940910/article/details/75451847 -->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { StepsType } from './StepMask'
	import HollowMask from '../Hollow-Mask/Hollow-Mask.svelte'
	import ToolTip from '../tooltip/Tooltip.svelte'
	import { DEFAULT_STATE_INDE, emits } from './config'
	import { useState } from './util'
	const dispatch = createEventDispatcher()

	export let gutter = 5 // 蒙层镂空区域 比 待镂空元素本身 大多少
	export let show: boolean = false // 展示step mask
	export let steps: StepsType = [] // step 列表
	export let stateIndex = DEFAULT_STATE_INDE // 当前状态下标

	$: currentStep = steps?.[stateIndex]

	const onNext = () => {
		stateIndex += 1
		dispatch('next', stateIndex + 1)
	}

	$: currentDom = currentStep?.dom
</script>

{#if show}
	<HollowMask {show} dom={currentDom} {gutter}>
		<button id="next-step-btn" class="mask-tip-btn" on:click={onNext}
			>下一步</button
		>
	</HollowMask>
{/if}

<!-- <style lang="scss">
	// .mask-wrap {
	// 	box-sizing: border-box;
	// 	position: fixed;
	// 	top: 0;
	// 	left: 0;
	// 	border-color: rgba(0, 0, 0, 0.75);
	// 	border-style: solid;
	// }
	// .mask-tip {
	// 	min-width: 175px;
	// 	text-align: center;
	// 	border: 1px solid rgb(0, 94, 166);
	// 	border-radius: 8px;
	// 	padding: 5px 10px;
	// 	position: absolute;
	// 	background: white;
	// 	transform: translateX(-50%);
	// }
	// .mask-tip:before {
	// 	content: '';
	// 	width: 10px;
	// 	height: 10px;
	// 	border: 1px solid rgb(0, 94, 166);
	// 	background: white;
	// 	position: absolute;
	// 	transform: rotate(45deg);
	// 	top: -6px;
	// 	left: calc(50% - 5px);
	// 	border-right-width: 0;
	// 	border-bottom-width: 0;
	// }

	// .mask-tip-desc {
	// 	display: block;
	// 	margin-bottom: 10px;
	// }

	// .mask-tip-btn {
	// 	border-radius: 4px;
	// 	padding: 6px;
	// 	border: none;
	// 	background-color: rgb(0, 94, 166);
	// 	cursor: pointer;
	// 	color: white;
	// }
</style> -->
