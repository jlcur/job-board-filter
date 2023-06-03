import { Badge } from "./Elements/Badge";
import { Button } from "./Elements/Button";

import { Clock, MapPin, Flame, Bolt } from "tabler-icons-react";

import { JobPosting } from "../types";

interface JobCardProps {
  jobPosting: JobPosting;
}

const getNumberOfDaysAgo = (end: Date): number => {
  const today = new Date();
  const millisecondsInDay = 24 * 60 * 60 * 1000;

  const diff = today.getTime() - end.getTime();
  return Math.round(diff / millisecondsInDay);
};

export const JobCard = ({ jobPosting }: JobCardProps) => {
  return (
    <div className="p-5 transition-all duration-500 bg-white border rounded-md border-neutral-100 hover:scale-105 hover:shadow-xl hover:shadow-slate-200">
      <div className="flex items-center gap-1 mb-3">
        {jobPosting.isResponsiveEmployer && (
          <Badge variant="primary" className="flex items-center gap-1">
            <Bolt size={16} />
            Responsive employer
          </Badge>
        )}
        {jobPosting.isUrgentlyHiring && (
          <Badge variant="secondary" className="flex items-center gap-1">
            <Flame size={16} />
            Urgently hiring
          </Badge>
        )}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-sm">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {jobPosting.companyName
                .match(/(^\S\S?|\b\S)?/g)
                .join("")
                .match(/(^\S|\S$)?/g)
                .join("")
                .toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-800">
              {jobPosting.jobTitle}
            </h2>
            <div className="flex items-center gap-1">
              <div className="mr-1 text-gray-500">{jobPosting.companyName}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between text-right">
          <div className="font-semibold text-gray-800">
            {jobPosting.salary.disclosed
              ? `€${jobPosting.salary.min?.toLocaleString()} - €${jobPosting.salary.max?.toLocaleString()}`
              : "Undisclosed salary"}
          </div>
          <div className="flex items-center justify-end gap-1 text-sm text-gray-500">
            <MapPin size={16} />
            {`${jobPosting.city}, ${jobPosting.country}`}
          </div>
        </div>
      </div>
      <p className="my-5 text-gray-700 truncate">{jobPosting.jobDescription}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock size={16} className="text-gray-500" />
          {`Posted ${getNumberOfDaysAgo(jobPosting.posted)} days ago`}
        </div>
        <Button variant="primary" className="shadow-md shadow-primary-200">
          See more
        </Button>
      </div>
    </div>
  );
};
