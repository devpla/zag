import * as timePicker from "@zag-js/time-picker"
import { Portal, normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

interface TimePickerProps extends Omit<timePicker.Props, "id"> {}

export function TimePicker(props: TimePickerProps) {
  const service = useMachine(timePicker.machine, {
    id: useId(),
    ...props,
  })

  const api = timePicker.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()}>
      <label {...api.getLabelProps()}>Time picker</label>

      <div {...api.getControlProps()}>
        <input {...api.getInputProps()} />
        <button {...api.getTriggerProps()}>🗓</button>
        <button {...api.getClearTriggerProps()}>❌</button>
      </div>

      <Portal>
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()}>
            <div {...api.getColumnProps({ unit: "hour" })}>
              {api.getHours().map((item) => (
                <button
                  key={item.value}
                  {...api.getHourCellProps({ value: item.value })}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div {...api.getColumnProps({ unit: "minute" })}>
              {api.getMinutes().map((item) => (
                <button
                  key={item.value}
                  {...api.getMinuteCellProps({ value: item.value })}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div {...api.getColumnProps({ unit: "second" })}>
              {api.getSeconds().map((item) => (
                <button
                  key={item.value}
                  {...api.getSecondCellProps({ value: item.value })}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div {...api.getColumnProps({ unit: "period" })}>
              <button {...api.getPeriodCellProps({ value: "am" })}>AM</button>
              <button {...api.getPeriodCellProps({ value: "pm" })}>PM</button>
            </div>
          </div>
        </div>
      </Portal>
    </div>
  )
}
