import { useState, useEffect } from "react";
import { JobCard } from "./components/JobCard";

import generateJobPostings from "./utils/generateJobPosting";
import { Filter } from "./features/filter/components/Filter";
import { JobPosting } from "./types";

import { Search } from "tabler-icons-react";

function App() {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [filteredJobPostings, setFilteredJobPostings] = useState<JobPosting[]>(
    []
  );
  const [titleSearchTerm, setTitleSearchTerm] = useState<string>("");

  const handleTitleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function getData() {
      const data = await generateJobPostings(25);
      setJobPostings(data);
      setFilteredJobPostings(data);
    }

    getData();
  }, []);

  return (
    <>
      <div className="bg-slate-100">
        <div className="justify-center max-w-screen-lg px-5 py-24 mx-auto">
          <h1 className="text-5xl font-bold text-gray-800">
            Find your dream job
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            Browse our latest job postings and find a job you'll love
          </p>
        </div>
      </div>
      <div className="justify-center max-w-screen-lg p-5 m-8 mx-auto">
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <Filter
              initialData={jobPostings}
              filteredData={filteredJobPostings}
              searchTerm={titleSearchTerm}
              setFilterData={setFilteredJobPostings}
            />
          </div>
          <div className="flex flex-col col-span-3 gap-5">
            {/** Search bar */}
            <div className="flex items-center gap-5 text-gray-400 border rounded border-neutral-100">
              <div className="flex items-center gap-1 p-3">
                <Search size={21} />
                <input
                  value={titleSearchTerm}
                  type="search"
                  onChange={handleTitleSearch}
                  placeholder="Search job title or keyword"
                  className="border-none focus:ring-0"
                />
              </div>
            </div>
            {filteredJobPostings.length === 0 ? (
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  No results
                </h2>
                <p>Try searching with different options</p>
              </div>
            ) : (
              <h2 className="font-semibold text-gray-500 text-md">
                {filteredJobPostings.length} results
              </h2>
            )}

            {filteredJobPostings.map((posting) => (
              <JobCard jobPosting={posting} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
