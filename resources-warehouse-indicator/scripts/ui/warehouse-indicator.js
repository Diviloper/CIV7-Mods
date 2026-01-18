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

export class ScreenResourceAllocationWarehouseIndicator {
  constructor(val) {
    this.baseScreen = val;
  }

  beforeAttach() { }

  afterAttach() {
    setTimeout(() => {
      const cityIds = Players.get(GameContext.localObserverID).Cities.getCityIds();
      const cityEntries = this.baseScreen.cityList.querySelectorAll(".city-entry");

      for (const cityEntry of cityEntries) {
        const id = cityEntry.getAttribute("data-city-id");
        const cid = cityIds.find((ci) => ci["id"] == id);
        if (cid === undefined) continue;

        const city = Cities.get(cid);
        if (!city) continue;

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
        console.warn(`${city.name}: ${warehouseCounter} warehouse buildings`);

        const container = cityEntry.querySelector(".city-top-container");
        
        const warehouseIndicator = document.createElement("div");
        warehouseIndicator.classList.add(
          "warehouse-indicator-text",
          "text-sm",
          "ml-2",
          "px-2",
          "flex",
          "items-center",
        );
        warehouseIndicator.textContent = `${warehouseCounter}`;
        
        const warehouseIcon = document.createElement("img");
        warehouseIcon.className = "size-6";
        warehouseIcon.setAttribute("src", "blp:yield_warehouse");
        warehouseIndicator.appendChild(warehouseIcon);

        const settlmentTypeIndicator = container.querySelector(".settlement-type-text");
        settlmentTypeIndicator.insertAdjacentElement(
          "afterend",
          warehouseIndicator,
        );
        console.warn(container.innerHTML);
      }
    }, 200);
  }

  beforeDetach() { }

  afterDetach() { }

  onAttributeChanged(name, prev, next) { }
}

Controls.decorate(
  "screen-resource-allocation",
  (val) => new ScreenResourceAllocationWarehouseIndicator(val),
);
