import { GetAllShops } from "../shops";
import { FetchSnapshotFromExternalSource } from "./fetchSnapshotFromExternalSource";
import { StoreSnapshot } from "./storeSnapshot";

class TakeSnapshotsForAllShops {
  constructor(
    private readonly getAllShops: GetAllShops,
    private readonly fetchSnapshot: FetchSnapshotFromExternalSource,
    private readonly storeSnapshot: StoreSnapshot
  ) {}

  public async run() {
    const allShops = await this.getAllShops.execute();
    for (const { id } of allShops) {
      const currentShopsInventory = await this.fetchSnapshot.forShop(id);
      await this.storeSnapshot.forShop(id, currentShopsInventory);
    }
  }
}

export { TakeSnapshotsForAllShops };
