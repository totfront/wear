export type TempUnit = "C" | "F";

function getStoredUnit(): TempUnit {
  return (localStorage.getItem("wear:temp-unit") as TempUnit) || "C";
}

let currentUnit: TempUnit = getStoredUnit();

export function getTempUnit(): TempUnit {
  return currentUnit;
}

export function setTempUnit(unit: TempUnit) {
  currentUnit = unit;
  localStorage.setItem("wear:temp-unit", unit);
}

export function formatTemp(celsius: number): string {
  if (currentUnit === "F") {
    return `${Math.round((celsius * 9) / 5 + 32)}°F`;
  }
  return `${Math.round(celsius)}°C`;
}
