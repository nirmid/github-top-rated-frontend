import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Table, Button } from "antd";
import { difference } from "lodash";
import type { ColumnsType } from "antd/es/table";
import BarChartComponent from "./barChart";
import { RepoData } from "../types/RepoData";
import { serverUrl, clientUrl } from "../util/constants";

const MostStarsTable: React.FC = () => {
  const authHeader = useAuthHeader() || "";
  const [dataSource, setDataSource] = useState<RepoData[]>([]);
  const [totalItems, setTotalItems] = useState(1);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  useEffect(() => {
    GetFavorites();
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
      const response = await axios.put(
        `${serverUrl}/user/removeFavorites`,
        {
          repos,
        },
        {
          headers: {
            Authenticator: authHeader,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  const GetFavorites = async () => {
    try {
      const response = await axios.get(`${serverUrl}/user/getFavorites`, {
        headers: {
          Authenticator: authHeader,
        },
      });
      const repos: RepoData[] = response.data.map((repo: any) => ({
        fullName: repo.fullName,
        language: repo.language,
        stars: repo.stars,
        description: repo.description,
        link: repo.link,
        repoId: repo.repoId,
      }));
      setDataSource(repos);
      setTotalItems(response.data.totalItems);
      console.log(totalItems);
    } catch (error) {
      console.log(error);
      alert((error as Error).message);
    }
  };

  const columns: ColumnsType = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Language", dataIndex: "language", key: "language" },
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
        <a href={`${clientUrl}/getMostStarred`}>Go to Most Starred</a>
        <Button type="primary" onClick={handleClick} disabled={!hasSelected}>
          Remove as Favorite
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
          total: totalItems,
          showSizeChanger: false,
        }}
      ></Table>
      <BarChartComponent repos={dataSource} />
    </div>
  );
};

export default MostStarsTable;
