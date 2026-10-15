import { convexTest } from 'convex-test';
import { expect, test } from 'vitest';
import schema from '../convex/schema';
import { api } from '../convex/_generated/api';
const modules = import.meta.glob('../convex/**/*.{ts,js}');
test('anonymous visitors cannot access administrator data', async () => {
  const t = convexTest(schema, modules);
  await expect(t.query(api.admin.dashboard, {})).rejects.toThrow();
});
test('public account creation stays disabled', async () => {
  const t = convexTest(schema, modules);
  await expect(t.action(api.auth.signIn, { provider: 'password', params: { email: 'NewVisitor', password: 'TestPasswordOnly123!', flow: 'signUp' } })).rejects.toThrow();
  expect(await t.run(ctx => ctx.db.query('users').collect())).toHaveLength(0);
});
