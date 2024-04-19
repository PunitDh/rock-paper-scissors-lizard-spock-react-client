import { LazyExoticComponent, Suspense } from "react";

type Props = {
  [x: string]: any;
};

const Loadable =
  (Component: LazyExoticComponent<() => React.ReactNode>) =>
  (props: Props): React.ReactNode => (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

export default Loadable;
