<script lang="ts">
	// 文字提示
	/**
   * TODO
   export let placement: string = '' // Tooltip 组件出现的位置top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end
   export let offset: number = 0 // 出现位置的偏移量
   export let transition: string = 'fade-in' // 动画名称
   export let trigger: string = 'hover' // 触发规则
   export let to: string | HTMLElement = '' // append to
   slot text 
   * 
   * */
	export let text: string = ''
	export let show: boolean = false
</script>

<div class="tooltip">
	<slot />
	<div class:hidden={show} class="tooltip_wrap">
		<slot name="text">
			{text}
		</slot>
	</div>
</div>

<style lang="scss">
	.tooltip {
		$tooltip_border_color: #eee;
		$tooltip_bg_color: #fff;
		position: relative;
		.tooltip_wrap {
			border: 1px solid $tooltip_border_color;
			border-radius: 8px;
			padding: 5px 10px;
			position: absolute;
			background-color: $tooltip_bg_color;
			&:before {
				content: '';
				width: 10px;
				height: 10px;
				border: 1px solid $tooltip_border_color;
				background-color: $tooltip_bg_color;
				position: absolute;
				transform: rotate(45deg);
				top: -6px;
				left: calc(50% - 5px);
				border-right-width: 0;
				border-bottom-width: 0;
			}
		}
		.hidden {
			display: visible;
		}
	}
</style>
