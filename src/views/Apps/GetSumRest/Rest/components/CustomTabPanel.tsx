import Box from "@mui/material/Box";

type Props = {
  children: JSX.Element | JSX.Element[];
  value: number;
  index: number;
  tabId: string;
  [x: string]: any;
};

export default function CustomTabPanel({
  children,
  value,
  index,
  tabId,
  ...other
}: Props): JSX.Element {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${tabId}-tab-${index}`}
      aria-labelledby={`${tabId}-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
