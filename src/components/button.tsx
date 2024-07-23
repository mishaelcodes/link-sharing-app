interface Props {
  text: string
  textColor: string,
  backgroundColor: string,
}

const Button = (props : Props) => {
  const {text, textColor, backgroundColor} = props
  return (<>
    <button className={`flex flex-col items-center justify-center self-stretch ${backgroundColor} ${textColor} gap-2 py-[11px] px-[27px] rounded-lg`}>
      {text}
    </button>
  </>);
};
export default Button;
