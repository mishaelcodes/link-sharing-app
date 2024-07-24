import { MouseEvent } from "react";

interface Props {
  text: string;
  textColor: string;
  backgroundColor: string;
  border?: string;
  event?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props : Props) => {
  const {text, textColor, backgroundColor, border, event} = props
  return (<>
    <button className={`flex flex-col items-center justify-center self-stretch ${backgroundColor} ${textColor} gap-2 py-[11px] px-[27px] rounded-lg ${border}`} onClick={event}>
      {text}
    </button>
  </>);
};
export default Button;
