"use client";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "../../constants";

import { FileType } from "@/typing";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extenstion = type.split("/")[1];

      return (
        <div className="w-10">
          <FileIcon
            extension={extenstion}
            labelColor={COLOR_EXTENSION_MAP[extenstion]}
            //@ts-ignore
            {...defaultStyles[extenstion]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "filename",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="underline text-blue-500 hover:text-blue-600"
        >
          Download
        </a>
      );
    },
  },
];
