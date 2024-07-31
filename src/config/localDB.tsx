export default function localDB(id: string) {
  const objectsData: Array<Record<string, string>> = [
    { name: "barfits_final.glb", id: "123" },
    { name: "Monitor.glb", id: "321" },
    { name: "table_volan.glb", id: "132" },
  ];

  const filtered: Record<string, string> | undefined = objectsData.find(
    (element) => element.id === id
  );

  if (typeof filtered !== "undefined") {
    return filtered.name;
  } else {
    return null;
  }
}
