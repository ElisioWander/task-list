import { Check } from "phosphor-react"
import styles from "./CheckBox.module.scss"

interface CheckBoxProps {
  isTaskCompleted: boolean;
  onActiveCheckbox: () => void;
}

export function ChackBox({ onActiveCheckbox, isTaskCompleted }: CheckBoxProps) {
  return (
    <label className={styles.checkboxContainer} >
      <input 
        type="checkbox" 
        disabled={isTaskCompleted} 
        checked={isTaskCompleted}
        onClick={onActiveCheckbox} 
        readOnly
      />
      <span className={styles.checkMark}>
        { isTaskCompleted && <Check size={11} weight={"bold"} color={"#ffffff"} /> }
      </span>
    </label>
  )
}