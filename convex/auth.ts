import { Password } from '@convex-dev/auth/providers/Password';
import { convexAuth } from '@convex-dev/auth/server';
import { ConvexError } from 'convex/values';

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password({
    profile(params) {
      // Checked for direct API calls too. Provisioning is internal only.
      if (params.flow !== 'signIn' || !['WillSmith', 'BoydCoates'].includes(String(params.email))) {
        throw new ConvexError('Invalid credentials or sign-in unavailable.');
      }
      const username = String(params.email);
      return { email: username, username, name: username, role: 'admin' as const };
    },
  })],
  session: { totalDurationMs: 86400000, inactiveDurationMs: 14400000 },
  signIn: { maxFailedAttempsPerHour: 5 },
});
