import { FC, ReactNode } from "react";

interface TComposeContext {
  component?: FC<{ children?: ReactNode }>[];
  children?: ReactNode;
}

export default function ComposeContext(props: TComposeContext) {
  const { component, children } = props;

  return (
    <>
      {component?.reduceRight(
        (acc, Comp) => (
          <Comp>{acc}</Comp>
        ),
        children
      )}
    </>
  );
}
