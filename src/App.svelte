<script lang="ts">
	import Counter from '@/components/Counter.svelte'
	import Marquee from '@/components/Marquee.svelte'
	import { toast } from '@/components/toast'
	import StepMask from '@/components/step-mask/StepMask.svelte'

	const data = ['item1', 'item2', 'item3']

	// toast('这是toast内容', 1500);

	let isStart = false
	setTimeout(() => {
		isStart = true
	}, 1000)
	const stepArr = [
		{
			dom: '.card',
			desc: '第一步：欢迎您来到这个APP',
		},
		{
			dom: '#aa',
			desc: '第二步：',
		},
	]
	let switchOn = false
</script>

<div class="card" id="card">
	<Counter />
</div>
<!--<Marquee {data}></Marquee>-->
<div id="aa" style="width: 400px; margin: 50px">aa</div>

<StepMask show={isStart} steps={stepArr} />
<style lang="less">
	.card {
		background-color: red;
	}
</style>
