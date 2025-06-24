import { TableProps } from "antd";

export interface DatatableProps<T = any> extends TableProps<T> {
  Selection?: boolean;
}