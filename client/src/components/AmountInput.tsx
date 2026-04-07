//import React from "react";
import styles from "./AmountInput.module.css";

type Props = {
  value: number;
  onChange: (val: number) => void;
};

export default function AmountInput({ value, onChange }: Props) {
  return (
    <div className={styles.container}>
      <label>Amount:</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={0}
      />
    </div>
  );
}