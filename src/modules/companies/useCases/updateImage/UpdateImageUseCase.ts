import { APP_API_URL } from './../../../../config/constants';
import { inject, injectable } from 'tsyringe';
import { IStorageProvider } from '../../../../shared/container/Providers/StorageProvider/IStorageProvider';
import { AppError } from '../../../../shared/errors/AppError';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';
import { CompanyMap } from '../../mapper/CompanyMap';

interface IRequest {
  _id: string;
  imageUrl: string;
}

@injectable()
class UpdateImageUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  async execute({ imageUrl, _id }: IRequest) {
    const company = await this.companiesRepository.findById(_id);

    if (!company) throw new AppError('user not found', 404);

    if (company && company.mainImageUrl) {
      await this.storageProvider.delete(company.mainImageUrl, 'avatars')
    }

    await this.storageProvider.save(imageUrl, "avatars");

    company.mainImageUrl = imageUrl;

    await this.companiesRepository.updateCompanyImage({
      _id,
      imageUrl,
    });

    return CompanyMap.toDTO(company)
  }
}

export { UpdateImageUseCase };
