import { Model } from 'mongoose';
import { Product } from 'src/modules/product/schemas/product.schema';

export const calculateOrderAmount = async (items: any, productModel: Model<Product>): Promise<number> => {
  const idSet = new Set();

  Object.keys(items).forEach((item) => {
    idSet.add(item);
  });

  const prices = await productModel.find({ _id: { $in: [...idSet] } }).select('price');

  const total = prices.reduce((acc, curr) => {
    const id = curr._id.toString();
    const { qty } = items[id];
    return acc + curr.price * qty;
  }, 0);

  return Number((total * 100).toFixed(2));
};
