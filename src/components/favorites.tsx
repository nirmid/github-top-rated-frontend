import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Table, Button } from "antd";

export interface DataRow {
  fullName: string;
  language: string | null;
  stars: number;
  description: string;
  link: string;
  repoId: number;
}

const serverUrl = "http://localhost:4000";

const MostStarsTable: React.FC = () => {
  const authHeader = useAuthHeader() || "";
  const [dataSource, setDataSource] = useState<DataRow[]>([]);
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
  };

  const updateFavorites = async (repos: DataRow[]) => {
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
      const repos: DataRow[] = response.data.repoData.map((repo: any) => ({
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

  const columns = [
    { title: "Full Name", dataIndex: "fullName", key: "fullName" },
    { title: "Language", dataIndex: "language", key: "language" },
    { title: "Stars", dataIndex: "stars", key: "stars" },
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
          pageSize: 10,
          total: totalItems,
        }}
      ></Table>
    </div>
  );
};

export default MostStarsTable;
