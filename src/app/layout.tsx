/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { StrictMode } from "react";

import GraphQLClient from '@/provider/GraphQLClient';
import { UserContextProvider as User } from '@/provider/User';
import { SnackbarProvider as Snackbar } from "@/provider/Snackbar";
import Theme from '@/theme';

export const metadata = {
  title: 'GeoRGA',
  description: 'Geographic Resource & Group Allocation',
}

function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <StrictMode>
          <GraphQLClient>
            <User>
              <Theme>
                <Snackbar>
                  {children}
                </Snackbar>
              </Theme>
            </User>
          </GraphQLClient>
        </StrictMode>
      </body>
    </html>
  )
}

export default Layout;
