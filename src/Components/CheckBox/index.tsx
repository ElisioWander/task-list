import { Check } from 'phosphor-react'

import styles from './CheckBox.module.scss'

interface CheckboxProps {
  isTaskChecked: boolean
  onMarkTaskAsChecked: () => void
}

export function Checkbox({
  onMarkTaskAsChecked,
  isTaskChecked,
}: CheckboxProps) {
  return (
    <label className={styles.checkboxContainer}>
      <input
        type="checkbox"
        checked={isTaskChecked}
        onClick={onMarkTaskAsChecked}
        readOnly
      />
      <span className={styles.checkMark}>
        {isTaskChecked && <Check size={11} weight={'bold'} color={'#ffffff'} />}
      </span>
    </label>
  )
}
