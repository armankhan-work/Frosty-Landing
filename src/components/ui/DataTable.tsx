import React from "react";
import styles from "./DataTable.module.css";

export type Column<T> = {
  key: string;
  header: string;
  render: (item: T, idx: number) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
};

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T, idx: number) => string | number;
  emptyLabel?: string;
  emptyDescription?: string;
  onRowClick?: (item: T) => void;
  className?: string;
};

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyLabel = "No items found",
  emptyDescription,
  onRowClick,
  className,
}: Props<T>) {
  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(" ")}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={styles[col.align || "left"]}
                style={col.width ? { width: col.width } : undefined}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!data.length ? (
            <tr>
              <td colSpan={columns.length} className={styles.emptyTd}>
                <div className={styles.emptyBox}>
                  <p className={styles.emptyLabel}>{emptyLabel}</p>
                  {emptyDescription ? (
                    <p className={styles.emptyDescription}>{emptyDescription}</p>
                  ) : null}
                </div>
              </td>
            </tr>
          ) : (
            data.map((item, idx) => (
              <tr
                key={keyExtractor(item, idx)}
                onClick={onRowClick ? () => onRowClick(item) : undefined}
                className={onRowClick ? styles.clickableRow : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key} className={styles[col.align || "left"]}>
                    {col.render(item, idx)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
