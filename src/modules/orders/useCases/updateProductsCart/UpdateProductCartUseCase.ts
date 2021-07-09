import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICart, ICartProduct } from '../../schemas/Cart';
import { ICartsRepository } from '../../repositories/ICartRepository';

interface IRequest {
  clientId: string;
  cartId: string;
  orderProducts: ICartProduct[];
}

@injectable()
class UpdateProductCartUseCase {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
  ) {}

  async execute({ clientId, cartId, orderProducts }: IRequest): Promise<ICart> {
    try {
      const cart = await this.cartsRepository.findById({ cartId });

      if (!cart) throw new AppError('cart not found', 404);
      if (
        String(cart.clientId) !== clientId &&
        String(cart.companyId) !== clientId
      )
        throw new AppError('not authorized', 403);

      const newCart = await this.cartsRepository.update({
        cartId,
        orderProducts,
      });

      return newCart;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { UpdateProductCartUseCase };
