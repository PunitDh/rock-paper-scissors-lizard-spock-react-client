import { Helmet } from "react-helmet";

type Props = {
  title: string;
  description: string;
  children: string | JSX.Element;
};

const PageContainer = ({ title, description, children }: Props) => (
  <div>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </div>
);

export default PageContainer;
