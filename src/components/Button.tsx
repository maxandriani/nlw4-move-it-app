import { useState } from "react"

export interface IButtonProps {
  children?: string;
  color?: string;
  type?: 'button' | 'submit';
}

export default function Button(props: IButtonProps) {
  const [counter, setCounter] = useState(1);

  function increment() {
    setCounter(counter + 1);
  }

  return (
    <button 
      type="button"
      onClick={increment}
      style={{ backgroundColor: props.color }}>
      <span>{props.children}</span>
      <span>{counter}</span>
    </button>
  )
}