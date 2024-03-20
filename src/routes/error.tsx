import { ReactNode } from "react";

export function ErrorContainer(children: ReactNode) {
  return (
    <div className="ErrorPage">
      <div className="main_block">{children}</div>
    </div>
  );
}
