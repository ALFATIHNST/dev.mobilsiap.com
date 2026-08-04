import { ReactNode } from "react";

interface Props {

  children: ReactNode;

}

export default function Button({
  children,
}: Props) {

  return (

    <button
      className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-2.5
      rounded-lg
      font-medium
      transition
      "
    >

      {children}

    </button>

  );

}
