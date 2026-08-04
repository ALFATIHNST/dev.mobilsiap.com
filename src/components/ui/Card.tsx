import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Card({ children }: Props) {
  return (
    <div className="rounded-xl bg-white shadow border p-6">
      {children}
    </div>
  );
}
