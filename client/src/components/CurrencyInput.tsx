import styles from "./CurrencyInput.module.css";

type Props = {
  value: string;
  options: string[];
  onChange: (val: string) => void;
  label: string;
};

const CurrencyInput: React.FC<Props> = ({
  value,
  options,
  onChange,
  label,
}) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>

      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;