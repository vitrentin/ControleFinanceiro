import { AuthenticateUserService } from "../services/AuthenticateUserService";

export class AuthenticateUserController {
  async handle(request, response) {
    const authenticateUserService = new AuthenticateUserService();

    const { email, password } = request.body;

    const result = await authenticateUserService.execute({
      email,
      password,
    });

    return response.json(result);
  }
}