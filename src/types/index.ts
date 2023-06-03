type Salary = {
  disclosed: boolean;
  min?: undefined | number;
  max?: undefined | number;
};

export interface JobPosting {
  id: string;
  companyName: string;
  companyLogo: string;
  jobTitle: string;
  jobDescription: string;
  isResponsiveEmployer: boolean;
  isUrgentlyHiring: boolean;
  salary: Salary;
  city: string;
  country: string;
  posted: Date;
  jobType: string;
  workType: string;
  industry: string;
}
