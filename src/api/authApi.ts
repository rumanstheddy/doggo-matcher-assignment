const BASE_URL = "https://frontend-take-home-service.fetch.com";

export async function login({ name, email }: { name: string; email: string }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    throw new Error(`Login failed: ${response.status} ${response.statusText}`);
  }

  // No need to handle cookies manually; browser will store them
  return response;
}

export async function logout() {
  const response = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error(`Logout failed: ${response.status} ${response.statusText}`);
  }
  return response;
}
