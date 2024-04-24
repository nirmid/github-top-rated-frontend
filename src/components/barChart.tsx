import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

type RepoData = {
  fullName: string;
  language: string;
  stars: number;
  description: string;
  link: string;
  repoId: number;
};

interface BarChartComponentProps {
  repos: RepoData[];
}

const BarChartComponent: React.FC<BarChartComponentProps> = ({ repos }) => {
  if (Array.isArray(repos) === false)
    return (
      <div>
        <h1>No data</h1>
      </div>
    );
  // Count the number of occurrences of each language
  const languageCounts: { [key: string]: number } = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  // Convert the language counts to an array of data for the bar chart
  const data = Object.keys(languageCounts).map((language) => ({
    language,
    count: languageCounts[language],
  }));

  return (
    <BarChart width={1000} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="language" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
};

export default BarChartComponent;
