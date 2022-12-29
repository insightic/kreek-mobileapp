import React from "react";

interface Props {
  shouldUpdate: boolean
  children: React.ReactNode
}

export const LazyView: React.FC<Props> = (props) => {
  const { shouldUpdate, children } = props;

  if (!shouldUpdate)
    return <></>;

  return <>{children}</>;
};
