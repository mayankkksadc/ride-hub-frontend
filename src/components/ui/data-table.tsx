
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  ChevronsUpDown 
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface DataTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
  }[];
  onRowClick?: (item: T) => void;
  searchable?: boolean;
  sortable?: boolean;
  pagination?: boolean;
  itemsPerPage?: number;
}

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  searchable = true,
  sortable = true,
  pagination = true,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data based on search query
  const filteredData = searchable
    ? data.filter((item) =>
        Object.values(item).some((value) =>
          value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : data;

  // Sort data
  const sortedData = sortable && sortColumn
    ? [...filteredData].sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];

        if (aValue === bValue) return 0;
        
        if (sortDirection === 'asc') {
          return aValue < bValue ? -1 : 1;
        } else {
          return aValue > bValue ? -1 : 1;
        }
      })
    : filteredData;

  // Paginate data
  const totalPages = pagination ? Math.ceil(sortedData.length / itemsPerPage) : 1;
  const paginatedData = pagination
    ? sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : sortedData;

  const handleSort = (column: keyof T) => {
    if (!sortable) return;

    if (sortColumn === column) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (column: keyof T) => {
    if (!sortable) return null;

    if (sortColumn !== column) {
      return <ChevronsUpDown className="h-4 w-4 ml-1 opacity-50" />;
    }
    
    return sortDirection === 'asc' 
      ? <ChevronUp className="h-4 w-4 ml-1" /> 
      : <ChevronDown className="h-4 w-4 ml-1" />;
  };

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 uber-input"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead 
                  key={column.header} 
                  className={sortable ? 'cursor-pointer' : ''}
                  onClick={() => handleSort(column.accessorKey)}
                >
                  <div className="flex items-center">
                    {column.header}
                    {sortable && getSortIcon(column.accessorKey)}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, index) => (
                <TableRow
                  key={index}
                  className={onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}
                  onClick={() => onRowClick && onRowClick(item)}
                >
                  {columns.map((column) => (
                    <TableCell key={`${index}-${column.header}`}>
                      {column.cell
                        ? column.cell(item)
                        : (item[column.accessorKey] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
