import { json, LoaderFunction } from 'remix';

import Typography from '@mui/material/Typography';

import { getUserTheme } from '~/utils/theme.server';

export const loader: LoaderFunction = async ({ request }) => {
  const themeName = await getUserTheme(request);
  throw json({ themeName, message: "Unauthorized" }, 401);
};

const PrivateRoute = () => {
  return (
    <Typography component="h1" variant="h3">
      Private Route
    </Typography>
  );
};

export default PrivateRoute;
