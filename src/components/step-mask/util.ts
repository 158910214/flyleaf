export const stateFactorry = (stateMap?: any[]) => (defaultState?: any) => {
  let hasFirstState: boolean
  let hasDefaultState: boolean
  let firstState = stateMap?.[0]

  $: hasFirstState = firstState !== undefined
  $: hasDefaultState = defaultState !== undefined

  let state = !hasDefaultState && hasFirstState ? firstState : defaultState
  const setState = (value: any) => state = value

  const reset = () => setState(defaultState)

  const actions = {
    reset
  }
  return [state, setState, actions]
}

export const useState = stateFactorry()

const TOGGLE_MAP = [false, true]
export const useToggle = stateFactorry(TOGGLE_MAP)