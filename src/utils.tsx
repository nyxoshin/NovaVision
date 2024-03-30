import React from "react";

interface IStyleApply {
  data: string;
  style: string;
}

export function styleApply({ data, style }: IStyleApply) {
  return <p className={style}>{data}</p>;
}
