import { type ReactNode } from "react";
import { JobPosting } from "../../../types";

export type FilterProps = {
  initialData: JobPosting[];
  filteredData: JobPosting[];
  searchTerm: string;
  setFilterData: React.Dispatch<React.SetStateAction<JobPosting[]>>;
};

export type FilterGroupProps = {
  title: string;
  children?: ReactNode;
};
