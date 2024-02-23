import { CreateUserService } from '../services/CreateUserService';
import { DeleteUserService } from '../services/DeleteUserService';
import { ShowUserService } from '../services/ShowProfileService';
import { UpdateUserService } from '../services/UpdateUserService';

export class UserController {
  async create(request, response) {
    const createUserService = new CreateUserService();
    const { name, email, password } = request.body;

    const result = await createUserService.execute({
      email,
      name,
      password,
    });

    return response.json(result);
  }

  async update(request, response) {
    const updateUserService = new UpdateUserService();
    const user_id = request.user.id;

    const data = request.body;

    const result = await updateUserService.execute(data, user_id);

    return response.json(result);
  }

  async show(request, response) {
    const showUserService = new ShowUserService();
    const user_id = request.user.id;

    const result = await showUserService.execute(user_id);

    return response.json(result);
  }

  async destroy(request, response) {
    const deleteUserService = new DeleteUserService();
    const user_id = request.user.id;

    await deleteUserService.execute(user_id);

    return response.json();
  }
}
