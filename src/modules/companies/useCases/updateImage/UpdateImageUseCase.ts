import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { deleteFile } from '../../../../utils/file';
import { ICompaniesRepository } from '../../repositories/ICompaniesRepository';

interface IRequest {
  _id: string;
  imageUrl: string;
}

@injectable()
class UpdateImageUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({ imageUrl, _id }: IRequest) {
    const company = await this.companiesRepository.findById(_id);

    if (!company) throw new AppError('user not found', 404);

    if (company && company.mainImageUrl) {
      await deleteFile(`./tmp/companiesImgs/${company.mainImageUrl}`);
    }

    company.mainImageUrl = imageUrl;

    await this.companiesRepository.updateCompanyImage({
      _id,
      imageUrl,
    });

    return company;
  }
}

export { UpdateImageUseCase };
