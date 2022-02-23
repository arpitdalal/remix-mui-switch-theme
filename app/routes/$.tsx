import type { LoaderFunction } from 'remix';
import { json } from 'remix';
import { getUserTheme } from '~/utils/theme.server';

import Typography from '@mui/material/Typography';

export const loader: LoaderFunction = async ({ request }) => {
  const themeName = await getUserTheme(request);
  throw json({ themeName, message: "Not Found" }, 404);
};

const NotFound = () => {
  return (
    <Typography component="h1" variant="h3">
      Not Found
    </Typography>
  );
};

export default NotFound;
