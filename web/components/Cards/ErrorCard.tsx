import ErrorSVG from "../../assets/svg/error.svg";
interface ContainerProps {
  messageError: string
}

export function ErrorCard(props: ContainerProps) {
  return (
    <>
      <div className="space-y-4 py-4">
        <div>
          <div className="flex items-center space-x-2">
            <img src={ErrorSVG} alt="error" width={25} height={25} />
            {/* <CheckIcon className="text-green-500" /> */}
            <h3 className="font-semibold">{props.messageError}</h3>
          </div>
        </div>
      </div>
    </>
  );
}
