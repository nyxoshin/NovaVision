import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localDB from "../../config/localDB";
import App from "../../App";

export default function Application() {
  //   const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const [newName, setNewName] = useState<string | null>(null);
  console.log("newName", newName);
  useEffect(() => {
    if (typeof id !== "undefined") {
      const data = localDB(id);
      setNewName(data);
    } else {
      setNewName(null);
    }
  }, [id]);

  return (
    <>
      {newName == null ? (
        <p>Ошибка получения данных модели</p>
      ) : (
        <App name={newName} />
      )}
    </>
  );
}
