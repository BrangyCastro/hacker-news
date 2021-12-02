interface Props {
  children?: React.ReactElement | React.ReactElement[];
  title: string;
}

export const Panel = ({ children }: Props) => {
  return <div>{children}</div>;
};
