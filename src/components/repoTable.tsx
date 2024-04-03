import DataTable, { TableColumn } from "react-data-table-component";
import { useState, useMemo, useCallback } from "react";
import { differenceBy } from "lodash";

export interface DataRow {
  fullname: string;
  language: string;
  stars: number;
  description: string;
  link: string;
  repoId: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Full name",
    selector: (row: any) => row.fullname,
  },
  {
    name: "Language",
    selector: (row: any) => row.language,
  },
  {
    name: "Stars",
    selector: (row: any) => row.stars,
  },
  {
    name: "Description",
    selector: (row: any) => row.description,
  },
  {
    name: "Link",
    selector: (row: any) => row.link,
  },
  {
    name: "Repo Id",
    selector: (row: any) => row.repoId,
  },
];

const TableComponent: React.FC<{ tableDataItems: DataRow[] }> = ({
  tableDataItems,
}) => {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(tableDataItems);
  const handleRowSelected = useCallback((state: any) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const contextActions = useMemo(() => {
    const handleSave = () => {
      // eslint-disable-next-line no-alert
      if (
        window.confirm(
          `Number of Repos to save as favorites: ${selectedRows.length}`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "title"));
      }
    };
    return (
      <button
        onClick={handleSave}
        style={{
          backgroundColor: "grey",
        }}
      >
        Save
      </button>
    );
  }, [data, selectedRows, toggleCleared]);
  return (
    <DataTable
      title="Repos"
      columns={columns}
      data={data}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      pagination
    />
  );
};

export default TableComponent;
