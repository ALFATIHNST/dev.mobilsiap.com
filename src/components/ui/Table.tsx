import { ReactNode } from "react";

interface Props {
  title: string;
  children: ReactNode;
  action?: ReactNode;
}

export default function Table({
  title,
  children,
  action,
}: Props) {
  return (
    <div className="bg-white rounded-xl shadow-sm border">

      <div className="flex items-center justify-between p-6 border-b">

        <div>

          <h2 className="text-xl font-semibold">
            {title}
          </h2>

        </div>

        {action}

      </div>

      <div className="overflow-x-auto">

        {children}

      </div>

    </div>
  );
}
