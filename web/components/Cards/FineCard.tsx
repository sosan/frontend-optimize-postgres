import { ConfigProvider, Table, TableProps, Tag, ThemeConfig } from "antd";
import { ResultState } from "./BackCard";
import { ColumnDataType } from "@/models/models";
import "../../assets/css/finecard.css";
import React from "react";

interface ContainerProps {
  resultData: ResultState
}


// export const dataSources = [
//   {
//     "key": "0-ddl",
//     "name": "many-not-null-unique",
//     "position": "Position Line 2 Column 1",
//     "description": "Relation has more than one unique indexes fully based on non-nullable columns",
//     "tags": [
//       "ook"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "1-ddl",
//     "name": "unlimited-varchar-or-text-column",
//     "position": "Position Line 3 Column 12",
//     "description": "unlimited-varchar-or-text-column",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "2-ddl",
//     "name": "b-tree-index-on-text",
//     "position": "Position Line 3 Column 12",
//     "description": "B-tree index on text or unlimited varchar column may lead to decreased performance. (column: \"email\", table: \"public.users\", indexes: users_pkey, users_email_key)",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "3-ddl",
//     "name": "unique-constraint",
//     "position": "Position Line 4 Column 6",
//     "description": "Recommended to use unique index instead unique constraint",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "4-ddl",
//     "name": "text-instead-varchar",
//     "position": "Position Line 5 Column 1",
//     "description": "Recommended to use TEXT with length limit inside CHECK constraint instead VARCHAR(100) for column \"firstname\" in relation \"users\"",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"

//   },
//   {
//     "key": "5-ddl",
//     "name": "text-instead-varchar",
//     "position": "Position Line 6 Column 1",
//     "description": "Recommended to use TEXT with length limit inside CHECK constraint instead VARCHAR(100) for column \"lastname\" in relation \"users\"",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "6-ddl",
//     "name": "name-shadows-function",
//     "position": "Position Line 6 Column 6",
//     "description": "Entity age has the same name as pg_catalog function",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "7-ddl",
//     "name": "text-instead-varchar",
//     "position": "Position Line 8 Column 1",
//     "description": "Recommended to use TEXT with length limit inside CHECK constraint instead VARCHAR(100) for column \"city\" in relation \"users\"",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "8-ddl",
//     "name": "text-instead-varchar",
//     "position": "Position Line 9 Column 1",
//     "description": "Recommended to use TEXT with length limit inside CHECK constraint instead VARCHAR(100) for column \"country\" in relation \"users\"",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "9-ddl",
//     "name": "name-shadows-type",
//     "position": "Position Line 9 Column 6",
//     "description": "Entity date has the same name as pg_catalog type",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "10-ddl",
//     "name": "name-shadows-function",
//     "position": "Position Line 9 Column 6",
//     "description": "Entity date has the same name as pg_catalog function",
//     "tags": [
//       "warning"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "11-ddl",
//     "name": "ddl-reserved-names",
//     "position": "Position Line 10 Column 1",
//     "description": "Recommend avoiding using reserved SQL standard names. \"date\" is occurs in following SQL standards: SQL:2016, SQL:2011, SQL-92",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "12-ddl",
//     "name": "ddl-date-name-type-inconsistency",
//     "position": "Position Line 10 Column 1",
//     "description": "The field name \"date\" in relation \"users\" differs markedly from its type \"timestamp\"",
//     "tags": [
//       "notice"
//     ],
//     "kind": "ddl"
//   },
//   {
//     "key": "0-dml",
//     "name": "select-asterisk",
//     "position": "Position Line 1 Column 8",
//     "description": "Avoid SELECT * or SELECT t.*, list all columns instead",
//     "tags": [
//       "warning"
//     ],
//     "kind": "dml"
//   },
//   {
//     "key": "1-dml",
//     "name": "select-naked",
//     "position": "Position Line 1 Column 1",
//     "description": "SELECT ... FROM without WHERE/LIMIT/GROUP BY",
//     "tags": [
//       "warning"
//     ],
//     "kind": "dml"
//   },
//   {
//     "key": "2-dml",
//     "name": "select-without-order-by",
//     "position": "Position Line 1 Column 1",
//     "description": "If sorting is not chosen, the rows will be returned in an unspecified order.",
//     "tags": [
//       "notice"
//     ],
//     "kind": "dml"
//   },
//   {
//     "key": "3-dml",
//     "name": "no-limit",
//     "position": "Position Line 1 Column 1",
//     "description": "Recommend to use LIMIT for decrease network interactions for multi-lines result SELECT statements.",
//     "tags": [
//       "notice"
//     ],
//     "kind": "dml"
//   }
// ];



enum CONFIG_TAGS {
  notice = "notice",
  warning = "warning",
  error = "error",
}

const columns: TableProps<ColumnDataType>['columns'] = [
  // {
  //   title: 'Name',
  //   dataIndex: 'name',
  //   key: 'name',
  //   hidden: true,
  // },
  // {
  //   title: 'Position',
  //   dataIndex: 'position',
  //   key: 'position',
  //   width: 200,
  //   hidden: true,
  // },
  {
    title: 'Kind',
    dataIndex: 'kind',
    key: 'kind',
    width: 60,
    render: (_, { kind }) => (
      <>
        {
          kind === "ddl" ? <>
            <Tag color="purple">
              {kind?.toUpperCase()}
            </Tag>
          </> : <>
            <Tag color="geekblue">
              {kind?.toUpperCase()}
            </Tag>
          </>
        }
      </>
    ),
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    ellipsis: true,
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    width: 100,
    render: (_, { tags }) => (
      <>
        {
          tags.map((tag: string) => {
            let color = "volcano";
            switch (tag) {
              case CONFIG_TAGS.notice:
                color = "geekblue";
                break;
              case CONFIG_TAGS.warning:
                color = "yellow";
                break;
              case CONFIG_TAGS.error:
                color = "volcano";
                break;
              default:
                color = "green";
                break;

            }

            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
      </>
    ),
  },

];

const ThemeFineCard: ThemeConfig = {
  token: {
    colorBgContainer: "#00000000",
    colorText: "#fafafa",
    colorBorder: "#fafafa",
  },
  components: {
    Table: {
      cellPaddingInline: 6,
      cellPaddingBlock: 6,
      borderColor: "#fafafa",
      headerBg: "#00000000",
      fontFamily: "ibmplexmono",
      fontSize: 12,
    },
  },
};

export function FineCard(props: ContainerProps) {
  return (
    <>
      <ConfigProvider theme={ThemeFineCard}>
        <div className="space-y-1 py-1">
          <Table size="middle" expandable={{
            expandedRowRender: (record) => (
              <p className="expandedrow">
                <b>{record.description}</b>
                <i>{record.position}</i>
              </p>),
            expandRowByClick: true,
            rowExpandable: (_) => true
          }} columns={columns} dataSource={props.resultData.columnDataSource} bordered={false} scroll={{ y: 300 }} showHeader={true} pagination={{ pageSize: 10 }} />
        </div>
        {/* <div className="flex justify-end space-x-4">
          <div className="text-sm">
            <p className="text-gray-400">Total duration</p>
            <p>0m 25s</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-400">0s</p>
            <p>21s</p>
          </div>
        </div> */}
      </ConfigProvider>
    </>
  );
}
