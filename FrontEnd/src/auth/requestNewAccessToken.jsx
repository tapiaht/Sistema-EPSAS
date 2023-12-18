import { API_URL } from "./authConstants";

export default async function requestNewAccessToken(refreshToken) {
  try {
    const response = await fetch(`${API_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    if (response.ok) {
      const json = await response.json();
      const { error, body } = json ;

      if (error) {
        throw new Error(error);
      }
      
      return body.accessToken;
    } else {
      throw new Error("Unable to refresh access token.");
    }
  } catch (error) {
    // Handle any additional error handling if needed
    console.error("Error refreshing access token:", error.message);
    throw error;
  }
}