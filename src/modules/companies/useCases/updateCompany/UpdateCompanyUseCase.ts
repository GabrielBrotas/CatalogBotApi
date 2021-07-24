import { injectable, inject } from 'tsyringe';
import { CompanyMap } from '../../mapper/CompanyMap';
import {
  ICompaniesRepository,
  IUpdateCompanyDTO,
} from '../../repositories/ICompaniesRepository';
import { ICompany } from '../../schemas/Company';
import { AppError } from '../../../../shared/errors/AppError';
import dayjs from 'dayjs';

@injectable()
class UpdateCompanyUseCase {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  async execute({
    _id,
    benefits,
    name,
    shortDescription,
    workTime,
    acceptedPaymentMethods,
  }: IUpdateCompanyDTO): Promise<ICompany> {

    // validate methods
    if(acceptedPaymentMethods) {
      let allMethodsIsFalse = true
      Object.keys(acceptedPaymentMethods).map(method => {
        if(acceptedPaymentMethods[method]) allMethodsIsFalse = false
      })

      if(allMethodsIsFalse) throw new AppError('Escolha alguma forma de pagamento', 400)
    }

    // validate time
    if(workTime && workTime.length > 0) {
      let isValidTimes = true
      workTime.map((day) => {
        const fromHour= Number(String(day.from).split(':')[0])
        const toHour = Number(String(day.to).split(':')[0])

        if(fromHour >= toHour) isValidTimes = false
      })

      if(!isValidTimes) throw new AppError('Horário inválido', 400)
    }

    const company = await this.companiesRepository.updateCompany({
      _id,
      benefits,
      name,
      shortDescription,
      workTime,
      acceptedPaymentMethods,
    });

    return CompanyMap.toDTO(company)
  }
}

export { UpdateCompanyUseCase };
