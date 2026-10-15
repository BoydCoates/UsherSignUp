import { convexTest } from 'convex-test';
import { expect, test } from 'vitest';
import schema from '../convex/schema';
import { api } from '../convex/_generated/api';
test('both existing administrator usernames retain admin access', async () => {
  const t = convexTest(schema, import.meta.glob('../convex/**/*.{ts,js}'));
  for (const username of ['WillSmith', 'BoydCoates']) {
    const id = await t.run(ctx => ctx.db.insert('users', { username, role: 'admin' }));
    expect(await t.withIdentity({ subject: `${id}|test-session` }).query(api.admin.me, {})).toMatchObject({ username });
  }
});
