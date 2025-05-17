import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";
import styles from "./PeriodSelector.module.scss";

interface PeriodSelectorProps {
  value: number;
  onChange: (days: number) => void;
}

export const PeriodSelector = ({ value, onChange }: PeriodSelectorProps) => {
  const handleChange = (e: RadioChangeEvent) => {
    onChange(e.target.value);
  };

  return (
    <Radio.Group
      value={value}
      onChange={handleChange}
      className={styles.container}
    >
      <Radio.Button value={1}>1 день</Radio.Button>
      <Radio.Button value={2}>2 дня</Radio.Button>
      <Radio.Button value={3}>3 дня</Radio.Button>
      <Radio.Button value={4}>4 дня</Radio.Button>
      <Radio.Button value={5}>5 дней</Radio.Button>
    </Radio.Group>
  );
};
