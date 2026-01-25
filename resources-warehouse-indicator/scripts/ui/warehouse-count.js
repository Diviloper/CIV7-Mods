import { R as ResourceAllocation } from "/base-standard/ui/resource-allocation/model-resource-allocation.chunk.js";

const WAREHOUSE_BUILDINGS = [
  "BUILDING_GRANARY",
  "BUILDING_SAW_PIT",
  "BUILDING_BRICKYARD",
  "BUILDING_FISHING_QUAY",
  "BUILDING_HARBOR",
  "BUILDING_GRISTMILL",
  "BUILDING_SAWMILL",
  "BUILDING_STONECUTTER",
  "BUILDING_GROCER",
  "BUILDING_IRONWORKS",
];

function addWarehouseCount(list) {
  for (const settlement of list) {
    addWarehouseCountSettlement(settlement);
  }
}

function addWarehouseCountSettlement(settlement) {
  const city = Cities.get(settlement.id);
  if (!city) {
    console.error(`City not found for settlement ${settlement.id.id}`);
    return;
  }

  const constructibles = city.Constructibles.getIds();
  let warehouseCounter = 0;

  for (const constructible of constructibles) {
    const item = Constructibles.getByComponentID(constructible);
    if (!item.complete) continue;

    const info = GameInfo.Constructibles.lookup(item.type);
    if (WAREHOUSE_BUILDINGS.includes(info.ConstructibleType)) {
      warehouseCounter++;
    }
  }
  settlement.warehouseCounter = warehouseCounter;
}

const RA_update = ResourceAllocation.update;
ResourceAllocation.update = function (...args) {
  RA_update.apply(this, args);
  addWarehouseCount(this._availableCities);
};
