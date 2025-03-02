interface ContainerProps {
  submitted: boolean
  view: boolean
}

export function ButtonViewBackCard(props: ContainerProps) {
  if (!props.view) return (<></>);
  return (
    <>
      <label htmlFor="card-trigger-rotate" className={`button-details button-details-enabled select-none cursor-pointer`} >
        <b className=" uppercase text-xl flex flex-row justify-center items-center">
          Details
        </b>
      </label>
    </>
  );
}
