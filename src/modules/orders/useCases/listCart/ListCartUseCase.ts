import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICart } from '../../entities/Cart';
import { IOrderProduct } from '../../entities/Order';
import { ICartsRepository } from '../../repositories/ICartRepository';

interface IRequest {
  clientId: string;
  companyId: string;
}

@injectable()
class ListCartUseCase {
  constructor(
    @inject('CartsRepository')
    private cartsRepository: ICartsRepository,
  ) {}

  async execute({ clientId, companyId }: IRequest): Promise<ICart> {
    try {
      const cart = await this.cartsRepository.findOne({ clientId, companyId });

      if (!cart) throw new AppError('cart not found', 404);

      return cart;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCartUseCase };
