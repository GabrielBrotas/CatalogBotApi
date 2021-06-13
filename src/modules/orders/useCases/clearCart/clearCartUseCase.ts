import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICart } from '../../entities/Cart';
import { ICartsRepository } from '../../repositories/ICartRepository';

interface IRequest {
  clientId: string;
  cartId: string;
}

@injectable()
class ClearCartUseCase {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
  ) {}

  async execute({ clientId, cartId }: IRequest): Promise<void> {
    try {
      const cart = await this.cartsRepository.findById({ cartId });

      if (!cart) throw new AppError('cart not found', 404);
      if (
        String(cart.clientId) !== clientId &&
        String(cart.companyId) !== clientId
      )
        throw new AppError('not authorized', 403);

      await this.cartsRepository.deleteAll({ cartId });

      return;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ClearCartUseCase };
