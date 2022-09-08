import { writable } from 'svelte/store'

export const stateFactorry = (stateMap?: any[]) => (defaultState?: any) => {
  let hasFirstState: boolean
  let hasDefaultState: boolean
  let firstState = writable(stateMap?.[0])

  $: hasFirstState = firstState !== undefined
  $: hasDefaultState = defaultState !== undefined

  let state = !hasDefaultState && hasFirstState ? firstState : defaultState
  const setState = firstState.set

  const reset = () => setState(defaultState)

  const actions = {
    reset
  }
  return [state, setState, actions]
}

export const useState = stateFactorry()

const TOGGLE_MAP = [false, true]
export const useToggle = stateFactorry(TOGGLE_MAP)