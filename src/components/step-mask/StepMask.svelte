<!-- inspired by https://blog.csdn.net/oliver940910/article/details/75451847 -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import type { StepsType } from './StepMask'
	const dispatch = createEventDispatcher()

	const emits = {
		next: 'next', // 每点击下一步时触发
		finish: 'finish', // 结束时触发
		updateState: 'updateState', // 状态外围管理切换时,实时更新状态
	}

	const DEFAULT_STATE_INDE = 0 // 默认初始状态

	export let gutter = 5 // 蒙层镂空区域 比 待镂空元素本身 大多少
	export let show: Boolean = false // 展示step mask
	export let steps: StepsType = [] // step 列表
	export let stateIndex = DEFAULT_STATE_INDE // 当前状态下标

	let maskDiv
	let tipDiv

	const setMask = (arr: StepsType) => {
		if (arr.length === 0) {
			maskDiv.style.display = 'none'
			return
		}

		// 获得要cover的元素的信息
		const { dom, desc = '' } = arr[0]
		var ele = document.getElementById(dom)
		var eleWidth = ele.offsetWidth
		var eleHeight = ele.offsetHeight
		var eleLeft = ele.offsetLeft
		var eleTop = ele.offsetTop
		console.log('待镂空元素: ', eleWidth, eleHeight, eleLeft, eleTop)

		// 获取屏幕大小，包括滚动区域
		var scrollWidth = document.body.scrollWidth
		var scrollHeight = document.body.scrollHeight

		/****************   为Mask设置css   ****************/
		maskDiv.style.width = scrollWidth + 'px'
		maskDiv.style.height = scrollHeight + 'px'
		maskDiv.style.position = 'absolute'
		maskDiv.style.left = 0
		maskDiv.style.top = 0
		maskDiv.style.display = 'block'
		maskDiv.style.boxSizing = 'border-box'

		maskDiv.style.borderColor = 'rgba(0, 0, 0, 0.75)'
		maskDiv.style.borderStyle = 'solid'
		maskDiv.style.borderLeftWidth = eleLeft - gutter + 'px'
		maskDiv.style.borderRightWidth =
			scrollWidth - eleWidth - eleLeft - gutter + 'px'
		maskDiv.style.borderTopWidth = eleTop - gutter + 'px'
		maskDiv.style.borderBottomWidth =
			scrollHeight - eleHeight - eleTop - gutter + 'px'

		// 自定义区域位置 todo 有可能镂空区域比较靠下，这时候这里就太靠下了
		tipDiv.style.top = eleHeight + gutter * 2 + 10 + 'px'
		tipDiv.style.left = '50%'

		/****************   为Mask设置desc   ****************/
		var maskDesc = document.getElementById('mask-desc')
		maskDesc.innerHTML = desc

		/****************   绑定next事件   ****************/
		var nextBtn = document.getElementById('next-step-btn')
		nextBtn.onclick = function () {
			arr.shift()
			setMask(arr)
		}
	}

	$: if (show) {
		console.log('show', show)
		setMask(steps)
	}
</script>

<div bind:this={maskDiv} style="display: none">
	<div class="mask-tip" bind:this={tipDiv}>
		<span id="mask-desc" class="mask-tip-desc" />
		<button id="next-step-btn" class="mask-tip-btn">下一步</button>
	</div>
</div>

<style lang="scss">
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
