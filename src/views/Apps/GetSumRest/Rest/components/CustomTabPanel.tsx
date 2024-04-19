import Box from "@mui/material/Box";

type Props = {
  children: React.ReactNode | React.ReactNode[];
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
}: Props) {
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
