<script lang="ts">
  import StateVisualizer from "$lib/components/state-visualizer.svelte"
  import Toolbar from "$lib/components/toolbar.svelte"
  import { useControls } from "$lib/use-controls.svelte"
  import * as radio from "@zag-js/radio-group"
  import { radioControls, radioData } from "@zag-js/shared"
  import { normalizeProps, useMachine } from "@zag-js/svelte"

  const controls = useControls(radioControls)

  const id = $props.id()
  const service = useMachine(
    radio.machine,
    controls.mergeProps<radio.Props>({
      id,
      name: "fruit",
      orientation: "horizontal",
    }),
  )

  const api = $derived(radio.connect(service, normalizeProps))
</script>

<main class="segmented-control">
  <div {...api.getRootProps()}>
    <div {...api.getIndicatorProps()}></div>
    {#each radioData as opt}
      <label data-testid={`radio-${opt.id}`} {...api.getItemProps({ value: opt.id })}>
        <span data-testid={`label-${opt.id}`} {...api.getItemTextProps({ value: opt.id })}>
          {opt.label}
        </span>
        <input data-testid={`input-${opt.id}`} {...api.getItemHiddenInputProps({ value: opt.id })} />
      </label>
    {/each}
  </div>
  <button onclick={api.clearValue}>reset</button>
</main>

<Toolbar {controls}>
  <StateVisualizer state={service} />
</Toolbar>
