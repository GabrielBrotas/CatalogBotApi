import { injectable, inject } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICartPopulated } from '../../schemas/Cart';
import { ICartsRepository } from '../../repositories/ICartRepository';
import { CartMap } from '../../../../modules/orders/mapper/CartMap';

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

  async execute({ clientId, companyId }: IRequest): Promise<ICartPopulated | null> {
    try {
      const cart = await this.cartsRepository.findOne({ clientId, companyId });

      if (!cart) return null;

      return CartMap.toDTO(cart);
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCartUseCase };
