import { Model } from "mongoose";

export type IPagination = {
  next?: {
    page: number;
    limit: number;
  };
  previous?: {
    page: number;
    limit: number;
  };
  total: number;
  results: any[];
};

type PaginationModelProps = {
  page: number,
  limit: number,
  repository: Model<any, {}, {}>
  countField: { [key: string]: string}
}

export async function paginateModel({page, limit,repository, countField}: PaginationModelProps) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const totalDocuments = await repository
  .countDocuments(countField)
  .exec();

  const results: IPagination = {
    results: [],
    total: totalDocuments,
  };

  if (endIndex < totalDocuments) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  return results
}
