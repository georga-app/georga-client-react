import { StrictMode } from "react";

import GraphQLClient from '@/provider/GraphQLClient';
import { UserContextProvider as User } from '@/provider/User';
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
                {children}
              </Theme>
            </User>
          </GraphQLClient>
        </StrictMode>
      </body>
    </html>
  )
}

export default Layout;
