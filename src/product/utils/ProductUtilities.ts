import { ProductSearchFilters } from '../types/ProductSearchFilters';

export class ProductUtilities {
  static buildQueryFromSearchFilters(
    query: any,
    searchFilters: ProductSearchFilters,
  ) {
    const { name, brand, category, sort, page, pageSize } = searchFilters;

    if (category) {
      query.where('categories', category);
    }

    if (name) {
      const nameQuery = new RegExp(name, 'i');
      query.where({ name: nameQuery });
    }

    if (brand) {
      const brands = brand.split(',');
      const regex = this.convertToRegex(brands);

      query.where({ brand: { $in: regex } });
    }

    query.sort(sort);
    query.skip((page - 1) * pageSize).limit(pageSize);

    return query;
  }

  static convertToRegex(array) {
    return array.map((item) => new RegExp(`^${item}`, 'i'));
  }
}
