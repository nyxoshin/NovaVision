import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localDB from "../../config/localDB";
import App from "../../App";

export default function Application() {
  console.log("12312312323");
  //   const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  console.log("QWERDEQGRHJTFGHRKJDGUYTWRQW", id);

  return <App name={id} />;
}
