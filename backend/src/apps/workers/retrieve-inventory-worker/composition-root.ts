import { FetchSnapshotFromKortteliKauppaApi } from "../../../ports/kortteli-kauppa-api";
import { ScheduledJob } from "../../../lib/scheduling";
import { StoreSnapshotInPostgres } from "../../../ports/postgres/inventory";
import { Postgres } from "../../../ports/postgres/postgres";
import {
  GetAllShopsFromPostgres,
  GetSingleShopFromPostgres,
} from "../../../ports/postgres/shops";
import { TakeSnapshotsForAllShops } from "../../../domain/inventory";

interface RetrieveInventoryWorkerConfiguration {
  database: Postgres;
  schedule: string;
  kortteliKauppaBaseUrl: string;
}
const makeRetrieveInventoryWorker = ({
  database,
  schedule,
  kortteliKauppaBaseUrl,
}: RetrieveInventoryWorkerConfiguration): ScheduledJob => {
  const getAllShops = new GetAllShopsFromPostgres(database);
  const getSingleShop = new GetSingleShopFromPostgres(database);
  const pullRawInventory = new FetchSnapshotFromKortteliKauppaApi(
    kortteliKauppaBaseUrl,
    getSingleShop
  );
  const storeRawInventory = new StoreSnapshotInPostgres(database);

  const takenSnapshotsForAllShops = new TakeSnapshotsForAllShops(
    getAllShops,
    pullRawInventory,
    storeRawInventory
  );

  return new ScheduledJob(
    database,
    "retrieve-inventory-worker",
    schedule,
    async () => takenSnapshotsForAllShops.run()
  );
};

export { makeRetrieveInventoryWorker };
