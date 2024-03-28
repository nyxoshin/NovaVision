export default function localDB(id: string) {
  const objectsData: Array<Record<string, string>> = [
    { name: "barfits_final.gltf", id: "123" },
    { name: "Monitor.gltf", id: "321" },
    { name: "table_volan.gltf", id: "132" },
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
