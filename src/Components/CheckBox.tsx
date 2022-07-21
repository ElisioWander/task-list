import { Check } from "phosphor-react"
import styles from "./CheckBox.module.scss"

interface CheckBoxProps {
  isChecked: boolean;
  onActiveCheckbox: () => void;
}

export function ChackBox({ onActiveCheckbox, isChecked }: CheckBoxProps) {
  return (
    <label className={styles.checkBox} >
      <input onClick={onActiveCheckbox} type="checkbox" disabled={isChecked} />
      <span className={styles.checkMark}>
        { isChecked && <Check size={11} weight={"bold"} color={"#ffffff"} /> }
      </span>
    </label>
  )
}