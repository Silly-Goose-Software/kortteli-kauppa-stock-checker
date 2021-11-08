import { Shop } from "./models/shop";

export type ShopId = Pick<Shop, "id">;

export interface DeleteShop {
  execute(shop: ShopId): Promise<void>;
}

export class DeleteShopFromMemory implements DeleteShop {
  constructor(private readonly shops: Shop[]) {}
  async execute(shop: ShopId): Promise<void> {
    const index = this.shops.findIndex((s) => s.id === shop.id);
    if (index === -1) {
      throw new Error("Shop not found");
    }
    this.shops.splice(index, 1)[0];
  }
}
