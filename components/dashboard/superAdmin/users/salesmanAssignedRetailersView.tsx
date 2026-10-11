import React, { useState } from "react";

// --- TypeScript Interfaces ---
export interface RetailerUser {
  _id: string;
  name: string;
  email: string;
  mobile: string;
  role: string;
  isActive: boolean;
}

export interface RetailerAssignment {
  _id: string;
  retailer: RetailerUser;
  salesman: string;
  assignedBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

interface RetailerListProps {
  retailers: RetailerAssignment[];
}

// --- Helper Functions ---
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// --- Component ---
export default function SalesmanAssignedRetailersView({ retailers = [] }: RetailerListProps) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter retailers based on name, email, or mobile number
  const filteredRetailers = retailers.filter((item) => {
    const name = item.retailer?.name?.toLowerCase() || "";
    const email = item.retailer?.email?.toLowerCase() || "";
    const mobile = item.retailer?.mobile || "";
    const query = searchTerm.toLowerCase();

    return name.includes(query) || email.includes(query) || mobile.includes(query);
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      {/* Header and Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Assigned Retailers
          </h2>
          <p className="text-sm text-gray-500">
            Total Retailers: {filteredRetailers.length}
          </p>
        </div>

        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-md shadow-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                Retailer Info
              </th>
              <th scope="col" className="px-6 py-3">
                Contact
              </th>
              <th scope="col" className="px-6 py-3">
                Assignment Status
              </th>
              <th scope="col" className="px-6 py-3">
                Account Status
              </th>
              <th scope="col" className="px-6 py-3">
                Assigned Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredRetailers.length > 0 ? (
              filteredRetailers.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  {/* Retailer Name & ID */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {item.retailer?.name || "N/A"}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      ID: {item.retailer?._id || item._id}
                    </div>
                  </td>

                  {/* Contact Info */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-gray-900">{item.retailer?.email}</div>
                    <div className="text-xs text-gray-500">{item.retailer?.mobile}</div>
                  </td>

                  {/* Assignment Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.isActive ? "Assigned" : "Inactive"}
                    </span>
                  </td>

                  {/* Account Status */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.retailer?.isActive
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.retailer?.isActive ? "Active Account" : "Disabled"}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {formatDate(item.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No retailers found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}