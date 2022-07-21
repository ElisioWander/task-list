import { useState } from "react"
import { Check } from "phosphor-react"
import styles from "./CheckBox.module.scss"

export function ChackBox() {
  const [isChecked, setIsChecked] = useState(false)
  const [count, setCount] = useState<number>(0)

  function handleActiveCheckbox() {
    setIsChecked(!isChecked)

    setCount(count + 1)
  }

  console.log(count)

  return (
    <label className={styles.checkBox} >
      <input onClick={handleActiveCheckbox} type="checkbox"  />
      <span className={styles.checkMark}>
        { isChecked && <Check size={10} weight={"bold"} color={"#ffffff"} /> }
      </span>
    </label>
  )
}