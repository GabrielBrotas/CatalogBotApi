
import { ICompany } from './../schemas/Company';

type ICompanyResponse = Omit<ICompany, 'password'>

class CompanyMap {
  static toDTO({
    _id,
    acceptedPaymentMethods,
    benefits,
    email,
    name,
    roles,
    mainImageUrl,
    shortDescription,
    workTime,
    created_at,
  }: ICompany): ICompanyResponse {
    const company = {
      _id,
      acceptedPaymentMethods,
      benefits,
      email,
      name,
      roles,
      mainImageUrl: mainImageUrl
        ? process.env.disk === 'local'
          ? `${process.env.APP_API_URL}/avatars/${mainImageUrl}`
          : `${process.env.AWS_BUCKET_URL}/avatars/${mainImageUrl}`
        : undefined,
      shortDescription,
      workTime,
      created_at,
    };
    return company;
  }
}

export { CompanyMap };