// import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

// const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

// const UserContext = createContext(null);

// export const RouteProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // const [posts, setPosts] = useState([]);
//     // const [sosList, setSosList] = useState([]);
//     // const [business, setBusiness] = useState([]);

//     // const fetchPublic = useCallback(async () => {
//     //     try {
//     //         const [postsRes, sosRes, businessRes] = await Promise.all([
//     //             fetch(`${API_BASE}/api/posts`),
//     //             fetch(`${API_BASE}/api/sos`),
//     //             fetch(`${API_BASE}/api/business`),
//     //         ]);

//     //         if (postsRes.ok) setPosts(await postsRes.json());
//     //         if (sosRes.ok) setSosList(await sosRes.json());
//     //         if (businessRes.ok) setBusiness(await businessRes.json());
//     //     } catch (err) {
//     //         console.warn('Failed to fetch public resources', err);
//     //     }
//     // }, []);

//     const fetchCurrentUser = useCallback(async (token) => {
//         if (!token) {
//             setUser(null);
//             return;
//         }

//         try {
//             const res = await fetch(`${API_BASE}/api/users/me`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (res.ok) {
//                 const data = await res.json();
//                 setUser(data);
//             } else {
//                 setUser(null);
//                 // clear invalid token
//                 if (res.status === 401 || res.status === 403) localStorage.removeItem('token');
//             }
//         } catch (err) {
//             console.error('fetchCurrentUser error', err);
//             setError(err.message || String(err));
//             setUser(null);
//         }
//     }, []);

//     // useEffect(() => {
//     //     const init = async () => {
//     //         setLoading(true);
//     //         await fetchPublic();

//     //         const token = localStorage.getItem('token');
//     //         if (token) {
//     //             await fetchCurrentUser(token);
//     //         } else {
//     //             setUser(null);
//     //         }

//     //         setLoading(false);
//     //     };

//     //     init();
//     // }, [fetchCurrentUser, fetchPublic]);

//     // const refresh = useCallback(async () => {
//     //     setLoading(true);
//     //     setError(null);
//     //     try {
//     //         await fetchPublic();
//     //         const token = localStorage.getItem('token');
//     //         if (token) await fetchCurrentUser(token);
//     //     } catch (err) {
//     //         setError(err.message || String(err));
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }, [fetchCurrentUser, fetchPublic]);

//     const value = {
//         user,
//         // posts,
//         // sosList,
//         // business,
//         loading,
//         error,
//         // refresh,
//         setUser,
//     };

//     return React.createElement(UserContext.Provider, { value }, children);
// };

// export const useRoute = () => {
//     const ctx = useContext(UserContext);
//     if (!ctx) throw new Error('useRoute must be used inside RouteProvider');
//     return ctx;
// };