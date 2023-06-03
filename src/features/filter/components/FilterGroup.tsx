import { FilterGroupProps } from "../types";

export const FilterGroup = ({ title, children }: FilterGroupProps) => {
  return (
    <div className="border-b border-neutral-100">
      <div className="items-center justify-between px-5 py-3">
        <h3 className="mb-3 font-semibold text-gray-800">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
};
