"use client";

import { useAuth } from '@/context/AuthContext';
import { useAuthApi } from '@/hooks/useAuthApi';
import React, { useState, useEffect } from 'react';

export const RetailersList: React.FC = () => {
    const api = useAuthApi();
    const { user } = useAuth();
    
    const [retailers, setRetailers] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Replace this with your actual API fetching logic
    const fetchRetailers = async (page: number) => {
        if(user?.role !== "SALESMAN") return;
        setLoading(true);
        setError(null);
        try {
            // Example URL structure: `/api/retailers?page=${page}`
            const response = await api.get(`/api/salesman/retailers/assigned?page=${page}`);
            if (response.data.success) {
                setRetailers(response.data.retailers);
                setCurrentPage(response.data.currentPage);
                // Handle backend returning -1 for dynamic/unknown total pages
                setTotalPages(response.data.totalPages <= 0 ? page + 1 : response.data.totalPages);
            } else {
                setError('Failed to fetch retailers data.');
            }
        } catch (err) {
            setError('An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!user) return;
        if(user.role !== "SALESMAN") return;
        fetchRetailers(currentPage);
    }, [user,currentPage]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div style={{ padding: '24px', fontFamily: 'sans-serif' }}>
            <h2 style={{ marginBottom: '16px' }}>Retailer Directory</h2>

            {loading && <p>Loading retailers...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {!loading && !error && (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid #ccc', background: '#f9f9f9' }}>
                                <th style={{ padding: '12px' }}>Name</th>
                                <th style={{ padding: '12px' }}>Email</th>
                                <th style={{ padding: '12px' }}>Mobile</th>
                                <th style={{ padding: '12px' }}>Status</th>
                                <th style={{ padding: '12px' }}>Assigned Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {retailers.map((item) => (
                                <tr key={item._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={{ padding: '12px', fontWeight: 'bold' }}>{item.retailer.name}</td>
                                    <td style={{ padding: '12px' }}>{item.retailer.email}</td>
                                    <td style={{ padding: '12px' }}>{item.retailer.mobile}</td>
                                    <td style={{ padding: '12px' }}>
                                        <span style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            background: item.retailer.isActive ? '#e6f4ea' : '#fce8e6',
                                            color: item.retailer.isActive ? '#137333' : '#c5221f'
                                        }}>
                                            {item.retailer.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td style={{ padding: '12px', color: '#666' }}>
                                        {new Date(item.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                            {retailers.length === 0 && (
                                <tr>
                                    <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#999' }}>
                                        No retailers found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px' }}>
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1 || loading}
                            style={{ padding: '8px 16px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                        >
                            Previous
                        </button>

                        <span>Page {currentPage}</span>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={retailers.length === 0 || loading || currentPage == totalPages}
                            style={{ padding: '8px 16px', cursor: retailers.length === 0 || currentPage == totalPages? 'not-allowed' : 'pointer' }}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};