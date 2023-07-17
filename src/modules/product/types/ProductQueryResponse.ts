import { ProductDto } from "../DTOs/product.dto";

export type ProductQueryResponse = {
  products: ProductDto[];
  pagination: {
    currentPage: number;
    pageSize: number;
    resultsCount: number;
    totalPages: number;
  };
};
