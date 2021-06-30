import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICart } from '../../schemas/Cart';
import { ICartsRepository } from '../../repositories/ICartRepository';

interface IRequest {
  clientId: string;
  cartId: string;
  orderProductId: string;
}

@injectable()
class RemoveProductFromCartUseCase {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
  ) {}

  async execute({
    clientId,
    cartId,
    orderProductId,
  }: IRequest): Promise<ICart | void> {
    try {
      const cart = await this.cartsRepository.findById({ cartId });

      if (!cart) throw new AppError('cart not found', 404);
      if (
        String(cart.clientId) !== clientId &&
        String(cart.companyId) !== clientId
      )
        throw new AppError('not authorized', 403);

      const newCart = await this.cartsRepository.deleteOne({
        cartId,
        orderProductId,
      });

      return newCart;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { RemoveProductFromCartUseCase };
