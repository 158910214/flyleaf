<!-- inspired by https://blog.csdn.net/oliver940910/article/details/75451847 -->
<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte'
	import type { StepsType } from './StepMask'
	import ToolTip from '../tooltip/Tooltip.svelte'
	import { DEFAULT_STATE_INDE, emits } from './config'
	import { useState, useToggle } from './util'
	const dispatch = createEventDispatcher()

	export let gutter = 5 // 蒙层镂空区域 比 待镂空元素本身 大多少
	export let show: boolean = false // 展示step mask
	export let steps: StepsType = [] // step 列表
	export let stateIndex = DEFAULT_STATE_INDE // 当前状态下标

	let markWrapDom
	let tipDiv

	const [currentStep, setStep] = useState(steps?.[stateIndex])
	let currentDom = null
	const setDom = (value: any) => (currentDom = value)
	onMount(() => {
		const dom = document.querySelector(currentStep.dom)
		setDom(dom)
	})
	$: hasSteps = !!steps.length

	const setMask = () => {
		console.log(show, hasSteps)
		if (!hasSteps) return console.log('no steps')
		const dom = currentDom
		if (!dom) return console.log('no default dom')
		// 获得要cover的元素的信息
		var eleWidth = dom.offsetWidth
		var eleHeight = dom.offsetHeight
		var eleLeft = dom.offsetLeft
		var eleTop = dom.offsetTop
		console.log('待镂空元素: ', eleWidth, eleHeight, eleLeft, eleTop)

		// 获取屏幕大小，包括滚动区域
		var scrollWidth = document.body.scrollWidth
		var scrollHeight = document.body.scrollHeight

		/****************   为Mask设置css   ****************/
		console.log('markWrapDom', markWrapDom)
		markWrapDom.style.width = scrollWidth + 'px'
		markWrapDom.style.height = scrollHeight + 'px'

		markWrapDom.style.borderLeftWidth = eleLeft - gutter + 'px'
		markWrapDom.style.borderRightWidth =
			scrollWidth - eleWidth - eleLeft - gutter + 'px'
		markWrapDom.style.borderTopWidth = eleTop - gutter + 'px'
		markWrapDom.style.borderBottomWidth =
			scrollHeight - eleHeight - eleTop - gutter + 'px'

		// 自定义区域位置 todo 有可能镂空区域比较靠下，这时候这里就太靠下了
		tipDiv.style.top = eleHeight + gutter * 2 + 10 + 'px'
		tipDiv.style.left = '50%'

		/****************   为Mask设置desc   ****************/
		var maskDesc = document.getElementById('mask-desc')
		maskDesc.innerHTML = currentStep.desc

		/****************   绑定next事件   ****************/
		var nextBtn = document.getElementById('next-step-btn')
		nextBtn.onclick = function () {
			steps.shift()
			setMask()
		}
	}
	$: {
		console.log(222, show && hasSteps)
		show && hasSteps && setMask()
	}
</script>

<ToolTip text={currentStep.desc}>
	<div class="mask-wrap" bind:this={markWrapDom}>
		<!-- <span id="mask-desc" class="mask-tip-desc" />
		<button id="next-step-btn" class="mask-tip-btn">下一步</button> -->
	</div>
</ToolTip>

<style lang="scss">
	.mask-wrap {
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		border-color: rgba(0, 0, 0, 0.75);
		border-style: solid;
	}
	.mask-tip {
		min-width: 175px;
		text-align: center;
		border: 1px solid rgb(0, 94, 166);
		border-radius: 8px;
		padding: 5px 10px;
		position: absolute;
		background: white;
		transform: translateX(-50%);
	}
	.mask-tip:before {
		content: '';
		width: 10px;
		height: 10px;
		border: 1px solid rgb(0, 94, 166);
		background: white;
		position: absolute;
		transform: rotate(45deg);
		top: -6px;
		left: calc(50% - 5px);
		border-right-width: 0;
		border-bottom-width: 0;
	}

	.mask-tip-desc {
		display: block;
		margin-bottom: 10px;
	}

	.mask-tip-btn {
		border-radius: 4px;
		padding: 6px;
		border: none;
		background-color: rgb(0, 94, 166);
		cursor: pointer;
		color: white;
	}
</style>
