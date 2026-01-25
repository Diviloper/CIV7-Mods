import { D as Databind } from "/core/ui/utilities/utilities-core-databinding.chunk.js";

export class ScreenResourceAllocationWarehouseIndicator {
  constructor(val) {
    this.baseScreen = val;
  }

  beforeAttach() {}

  afterAttach() {
    const cityEntries =
      this.baseScreen.cityList.querySelectorAll(".city-entry");

    for (const cityEntry of cityEntries) {
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

      const warehouseCount = document.createElement("span");
      warehouseCount.classList.add("warehouse-count");
      Databind.value(warehouseCount, "entry.warehouseCounter");
      warehouseIndicator.appendChild(warehouseCount);

      const warehouseIcon = document.createElement("img");
      warehouseIcon.className = "size-6";
      warehouseIcon.setAttribute("src", "blp:yield_warehouse");
      warehouseIndicator.appendChild(warehouseIcon);

      const settlementTypeIndicator = container.querySelector(
        ".settlement-type-text",
      );
      settlementTypeIndicator.insertAdjacentElement(
        "afterend",
        warehouseIndicator,
      );
      console.warn(warehouseIndicator.parentElement.innerHTML);
    }
  }

  beforeDetach() {}

  afterDetach() {}

  onAttributeChanged(name, prev, next) {}
}

Controls.decorate(
  "screen-resource-allocation",
  (val) => new ScreenResourceAllocationWarehouseIndicator(val),
);
