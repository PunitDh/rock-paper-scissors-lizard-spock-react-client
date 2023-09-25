import { Suspense } from "react";

type Props = {
  [x: string]: any;
};

const Loadable =
  (Component: () => JSX.Element) =>
  (props: Props): JSX.Element => (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
