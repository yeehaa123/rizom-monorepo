
export async function createMatrixUser(
  username: string,
  password: string,
  adminToken: string
): Promise<Response> {
  const response = await fetch(`https://matrix.rizom.ai/_synapse/admin/v2/users/@${username}:rizom.ai`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      password: password,
      displayname: username,
      admin: false,
      deactivated: false,  // Add this line to ensure the account is active
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Matrix API error: ${JSON.stringify(error)}`);
  }

  return response;
}

export async function deleteMatrixUser(username: string, adminToken: string): Promise<Response> {
  const response = await fetch(`https://matrix.rizom.ai/_synapse/admin/v1/deactivate/@${username}:rizom.ai`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      erase: true, // This will fully remove the user's data
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Matrix API error: ${JSON.stringify(error)}`);
  }

  return response;
}
