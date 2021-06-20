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

  async execute({ clientId, companyId }: IRequest): Promise<ICart | null> {
    try {
      const cart = await this.cartsRepository.findOne({ clientId, companyId });

      if (!cart) return null;

      return cart;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}

export { ListCartUseCase };
