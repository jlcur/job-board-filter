import { useState, useEffect } from "react";

import { Checkbox } from "../../../components/Elements/Checkbox";
import { JobPosting } from "../../../types";

import { datePostedOptions, jobTypeOptions } from "../../../utils/constants";
import { FilterGroup } from "./FilterGroup";
import { FilterProps } from "../types";

export const Filter = ({
  initialData,
  filteredData,
  searchTerm,
  setFilterData,
}: FilterProps) => {
  // ------------------------------------------------------------------
  // Filter states
  // ------------------------------------------------------------------
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedWorkTypes, setSelectedWorkTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedPostDate, setSelectedPostDate] = useState<string>(
    datePostedOptions[0]
  );

  // ------------------------------------------------------------------
  // Location show more / show less container state
  // ------------------------------------------------------------------
  const [expanded, setExpanded] = useState<boolean>(false);

  // ------------------------------------------------------------------
  // Generate distinct locations and distinct industries from data
  // ------------------------------------------------------------------
  const distinctLocations = [
    ...new Set(initialData.map((posting) => posting.country)),
  ];

  const distinctIndustries = [
    ...new Set(initialData.map((posting) => posting.industry)),
  ];

  // ------------------------------------------------------------------
  // Function to handle checkbox filter state change
  // ------------------------------------------------------------------
  const handleCheckboxChange = (
    event: any,
    checkboxState: any[],
    setCheckboxState: (arg0: any[]) => void
  ) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      setCheckboxState([...checkboxState, event.target.id.toLowerCase()]);
    } else {
      setCheckboxState(
        checkboxState.filter((item) => item !== event.target.id.toLowerCase())
      );
    }
  };

  // ------------------------------------------------------------------
  // Filter data
  // ------------------------------------------------------------------
  const filterWithState = (data: any[], state: string[], key: string) => {
    if (state.length === 0) {
      return data;
    }

    return data.filter((item) =>
      state.find((elem) => item[key].toLowerCase() === elem)
    );
  };

  // ------------------------------------------------------------------
  // Filter by date posted
  // ------------------------------------------------------------------
  const filterSelectedDate = (data: JobPosting[]) => {
    const todaysDate = new Date();
    const calcDate = (daysAgo: number) =>
      new Date(
        todaysDate.getFullYear(),
        todaysDate.getMonth(),
        todaysDate.getDate() - daysAgo
      );

    switch (selectedPostDate) {
      case "Anytime":
        return data;
      case "Today":
        return data.filter((item) => new Date(item.posted) >= todaysDate);
      case "Last 3 days":
        return data.filter((item) => new Date(item.posted) >= calcDate(3));
      case "Last 7 days":
        return data.filter((item) => new Date(item.posted) >= calcDate(7));
      case "Last 14 days":
        return data.filter((item) => new Date(item.posted) >= calcDate(14));
      case "Last 30 days":
        return data.filter((item) => new Date(item.posted) >= calcDate(30));
      default:
        return data;
    }
  };

  const filterBySearchTerm = (data: JobPosting[]) => {
    if (searchTerm === "") {
      return data;
    }

    return data.filter((posting) =>
      posting.jobTitle.toLowerCase().includes(searchTerm)
    );
  };

  // ------------------------------------------------------------------
  // Update all filters whenever one changes
  // ------------------------------------------------------------------
  useEffect(() => {
    let filteredData = initialData;
    filteredData = filterWithState(filteredData, selectedJobTypes, "jobType");
    filteredData = filterWithState(filteredData, selectedWorkTypes, "workType");
    filteredData = filterWithState(filteredData, selectedLocations, "country");
    filteredData = filterSelectedDate(filteredData);
    filteredData = filterWithState(
      filteredData,
      selectedIndustries,
      "industry"
    );
    filteredData = filterBySearchTerm(filteredData);
    setFilterData(filteredData);
  }, [
    selectedJobTypes,
    selectedWorkTypes,
    selectedLocations,
    selectedPostDate,
    selectedIndustries,
    searchTerm,
  ]);

  return (
    <div className="border rounded-md border-neutral-100">
      {/** Filter heading container */}
      <FilterGroup title="Filter" />
      {/** Job type container */}
      <FilterGroup title="Job type">
        {jobTypeOptions.map((jobType) => (
          <Checkbox
            label={jobType}
            onChange={(e) =>
              handleCheckboxChange(e, selectedJobTypes, setSelectedJobTypes)
            }
            categoryCount={
              filteredData.filter(
                (item) => item.jobType === jobType.toLowerCase()
              ).length
            }
          />
        ))}
      </FilterGroup>
      {/** Industry container */}
      <FilterGroup title="Industry">
        {distinctIndustries.map((industry) => (
          <Checkbox
            label={industry}
            onChange={(e) =>
              handleCheckboxChange(e, selectedIndustries, setSelectedIndustries)
            }
            categoryCount={
              filteredData.filter((item) => item.industry === industry).length
            }
          />
        ))}
      </FilterGroup>
      {/** On-site/Remote container */}
      <FilterGroup title="On-site/remote">
        <Checkbox
          label="On-site"
          onChange={(e) =>
            handleCheckboxChange(e, selectedWorkTypes, setSelectedWorkTypes)
          }
          categoryCount={
            filteredData.filter((item) => item.workType === "on-site").length
          }
        />
        <Checkbox
          label="Remote"
          onChange={(e) =>
            handleCheckboxChange(e, selectedWorkTypes, setSelectedWorkTypes)
          }
          categoryCount={
            filteredData.filter((item) => item.workType === "remote").length
          }
        />
        <Checkbox
          label="Hybrid"
          onChange={(e) =>
            handleCheckboxChange(e, selectedWorkTypes, setSelectedWorkTypes)
          }
          categoryCount={
            filteredData.filter((item) => item.workType === "hybrid").length
          }
        />
      </FilterGroup>
      {/** Date posted container */}
      <FilterGroup title="Date posted">
        <select
          className="w-full text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none border-neutral-300 focus:border-primary-600"
          value={selectedPostDate}
          onChange={(e) => setSelectedPostDate(e.target.value)}
        >
          {datePostedOptions.map((date) => (
            <option>{date}</option>
          ))}
        </select>
      </FilterGroup>
      {/** Location container */}
      <FilterGroup title="Location">
        {expanded
          ? distinctLocations.map((location) => (
              <Checkbox
                label={location}
                onChange={(e) =>
                  handleCheckboxChange(
                    e,
                    selectedLocations,
                    setSelectedLocations
                  )
                }
                categoryCount={
                  filteredData.filter((item) => item.country === location)
                    .length
                }
              />
            ))
          : distinctLocations
              .slice(0, 5)
              .map((location) => (
                <Checkbox
                  label={location}
                  onChange={(e) =>
                    handleCheckboxChange(
                      e,
                      selectedLocations,
                      setSelectedLocations
                    )
                  }
                  categoryCount={
                    filteredData.filter((item) => item.country === location)
                      .length
                  }
                />
              ))}
        <div className="text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="hover:underline"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        </div>
      </FilterGroup>
    </div>
  );
};
