import { faker } from "@faker-js/faker";
import { randBrand } from "@ngneat/falso";
import { JobPosting } from "../types";

// ------------------------------------------------------------------
// Generate a random element from the given array
// ------------------------------------------------------------------
const jobTypes = ["full-time", "part-time", "internship"];
const workTypes = ["on-site", "remote", "hybrid"];
const areaTypes = [
  "Engineering",
  "Banking",
  "Marketing & PR",
  "Hospitality",
  "Manufacturing",
  "Sales",
  "Other",
];

function generateFromArray(array: string[]) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

// ------------------------------------------------------------------
// Generate a random job posting
// ------------------------------------------------------------------
function randomJobPosting(): JobPosting {
  return {
    id: faker.string.uuid(),
    companyName: randBrand(),
    companyLogo: faker.image.urlPlaceholder({ height: 64, width: 64 }),
    jobTitle: faker.person.jobTitle(),
    jobDescription: faker.lorem.paragraphs(3),
    isResponsiveEmployer: faker.datatype.boolean(),
    isUrgentlyHiring: faker.datatype.boolean(),
    salary: {
      disclosed: faker.datatype.boolean(),
      min:
        Math.round(faker.number.int({ min: 32000, max: 48000 }) / 1000) * 1000,
      max:
        Math.round(faker.number.int({ min: 50000, max: 125000 }) / 1000) * 1000,
    },
    city: faker.location.city(),
    country: faker.location.country(),
    posted: faker.date.recent({ days: 30 }),
    jobType: generateFromArray(jobTypes),
    workType: generateFromArray(workTypes),
    industry: generateFromArray(areaTypes),
  };
}

// ------------------------------------------------------------------
// Returns an array of job postings of the given size
// ------------------------------------------------------------------
const generateJobPostings = (numberOfPostings: number): JobPosting[] => {
  const postings: JobPosting[] = [];

  for (let i = 0; i < numberOfPostings; i++) {
    postings.push(randomJobPosting());
  }
  return postings;
};

export default generateJobPostings;
