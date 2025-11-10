import { auth } from '~~/lib/auth';

export default defineEventHandler(async (event) => {
  const headers = event.headers;

  const body = await readBody(event);

  const updateData: {
    name?: string;
    image?: string | undefined;
  } = {};

  if (body.name !== undefined) {
    updateData.name = body.name;
  }

  if (body.image !== undefined) {
    updateData.image = body.image || undefined;
  }

  const updatedUser = await auth.api.updateUser({
    headers,
    body: updateData,
  });

  return {
    success: true,
    user: updatedUser,
  };
});
