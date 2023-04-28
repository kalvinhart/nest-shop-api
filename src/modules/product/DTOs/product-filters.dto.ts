export class ProductFiltersDto {
  constructor(filters: { brands: string[]; colors: string[]; sizes: string[] }) {
    this.brands = filters.brands;
    this.colors = filters.colors;
    this.sizes = filters.sizes;
  }

  brands: string[];
  colors: string[];
  sizes: string[];
}
