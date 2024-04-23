import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Table, Button } from "antd";
import { difference } from "lodash";
import BarChartComponent from "./barChart";
import type { ColumnsType } from "antd/es/table";
import { RepoData } from "../types/RepoData";
import { serverUrl, clientUrl } from "../util/constants";

const MostStarsTable: React.FC = () => {
  const authHeader = useAuthHeader() || "";
  const [dataSource, setDataSource] = useState<RepoData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    GetMostStarred(1);
  }, []);

  const handleClick = () => {
    console.log(selectedRows);
    const repos = selectedRows.map((row) => {
      return dataSource[row];
    });
    updateFavorites(repos);
    const newDataSource = difference(dataSource, repos);
    setDataSource(newDataSource);
    setSelectedRows([]);
  };

  const updateFavorites = async (repos: RepoData[]) => {
    try {
      const response = await axios.post(
        `${serverUrl}/user/updateFavorites`,
        {
          repos,
        },
        {
          headers: {
            Authorization: authHeader,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  const GetMostStarred = async (page: number) => {
    try {
      const response = await axios.get(`${serverUrl}/user/getMostStarred`, {
        headers: {
          Authorization: authHeader,
        },
        params: {
          page,
        },
      });
      const repos: RepoData[] = response.data.repoData.map((repo: any) => ({
        fullName: repo.fullName,
        language: repo.language,
        stars: repo.stars,
        description: repo.description,
        link: repo.link,
        repoId: repo.repoId,
      }));
      setDataSource(repos);
      setTotalPages(response.data.lastPage);
      console.log(totalPages);
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  const columns: ColumnsType<RepoData> = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    {
      title: "Language",
      dataIndex: "language",
      key: "language",
      filters: [
        {
          text: "TypeScript",
          value: "TypeScript",
        },
        {
          text: "JavaScript",
          value: "JavaScript",
        },
        {
          text: "Java",
          value: "Java",
        },
        {
          text: "Python",
          value: "Python",
        },
        {
          text: "C",
          value: "C",
        },
        {
          text: "C++",
          value: "C++",
        },
        {
          text: "Go",
          value: "Go",
        },
        {
          text: "Swift",
          value: "Swift",
        },
        {
          text: "PHP",
          value: "PHP",
        },
        {
          text: "Rust",
          value: "Rust",
        },
      ],
      onFilter: (value, record) =>
        record.language.indexOf(value as string) === 0,
    },

    {
      title: "Stars",
      dataIndex: "stars",
      key: "stars",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.stars - b.stars,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Link", dataIndex: "link", key: "link" },
    { title: "Repo Id", dataIndex: "repoId", key: "repoId" },
  ];

  const onSelectChange = (newSelectedRows: React.Key[]) => {
    setSelectedRows(newSelectedRows);
  };

  const rowSelection = {
    selectedRows,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRows.length > 0;

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <a href={`${clientUrl}/getFavorites`}>Go to favorites</a>
        <Button type="primary" onClick={handleClick} disabled={!hasSelected}>
          Save as Favorite
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRows.length} items` : ""}
        </span>
      </div>

      <Table
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource.map((item, index) => ({ ...item, key: index }))}
        pagination={{
          pageSize: 30,
          total: 30 * totalPages,
          showSizeChanger: false,
          onChange: (page) => {
            GetMostStarred(page);
          },
        }}
      ></Table>
      <BarChartComponent repos={dataSource} />
    </div>
  );
};

export default MostStarsTable;
