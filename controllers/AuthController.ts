import { SimpleError } from "../types/SimpleError";
import { Config } from "../utils/Config";

export class AuthController {
  static async verifySession(session: string): Promise<string | undefined> { // returns the email or undefined if session expired
    const verifyUrl = `${Config.AUTH_SERVICE_URL}/session/verify`;

    try {
      const result = await fetch(verifyUrl + "?" + new URLSearchParams({
        session_id: session,
      }), {
        method: "GET",
      });

      if (result.ok) {
        const response = await result.json();
        const email: string = response.data.email;

        return email;
      }

      return undefined;
    } catch (e) {
      throw new SimpleError("failed to perform request", e);
    }
  }

  static async logIn(email: string, password: string, rememberMe: boolean): Promise<string> { // returns the session
    const loginUrl = `${Config.AUTH_SERVICE_URL}/user/login`;

    const body = {
      email,
      password,
      remember_me: rememberMe,
    };

    try {
      const result = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const response = await result.json();

      if (result.ok) {
        const sessionId: string = response.data.session_id;
        return sessionId;
      } else {
        throw new SimpleError(response.error);
      }
    } catch (e) {
      throw new SimpleError("failed to perform request", e);
    }
  }
}
