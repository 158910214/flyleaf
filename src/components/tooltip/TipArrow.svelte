<script lang="ts">
	import { getPlacementDict, getPlacementLabel } from './TipConfig'

	export let placement = null
	const PLACEMENT_DICT = getPlacementDict('tiparrow_pm')
</script>

<div class="tooltip-arrow {getPlacementLabel(placement, PLACEMENT_DICT)}">
	<slot />
</div>

<style lang="scss">
	.tooltip-arrow {
		z-index: -1;
		content: '';
		width: 10px;
		height: 10px;
		border: 1px solid #0d0d0d;
		background: white;
		position: absolute;
		border-right-width: 0;
		border-bottom-width: 0;
		&.tiparrow_pm_bottom,
		&.tiparrow_pm_bottom-start,
		&.tiparrow_pm_bottom-end {
			transform: rotate(45deg);
			top: -6px;
		}
		&.tiparrow_pm_top,
		&.tiparrow_pm_top-start,
		&.tiparrow_pm_top-end {
			transform: rotate(-135deg);
		}
		&.tiparrow_pm_top-start {
			left: 10px;
		}
		&.tiparrow_pm_top,
		&.tiparrow_pm_bottom {
			left: calc(50% - 5px);
		}
		&.tiparrow_pm_top-end,
		&.tiparrow_pm_bottom-end {
			right: 10px;
		}
		&.tiparrow_pm_left-start,
		&.tiparrow_pm_left,
		&.tiparrow_pm_left-end {
			right: -6px;
			transform: rotate(-225deg);
		}

		&.tiparrow_pm_left-start,
		&.tiparrow_pm_right-start {
			top: 8px;
		}
		&.tiparrow_pm_left-end,
		&.tiparrow_pm_right-end {
			bottom: 8px;
		}

		&.tiparrow_pm_left,
		&.tiparrow_pm_right {
			top: calc(50% - 5px);
		}
		&.tiparrow_pm_right-start,
		&.tiparrow_pm_right,
		&.tiparrow_pm_right-end {
			transform: rotate(-45deg);
			left: -6px;
		}
	}
</style>
