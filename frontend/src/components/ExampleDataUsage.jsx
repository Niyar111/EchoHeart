import React from 'react';
import { usePosts } from '../hooks/usePosts';
import { useBusiness } from '../hooks/useBusiness';
import { useSOS } from '../hooks/useSOS';
import { useNotifications } from '../hooks/useNotifications';
import { useUser } from '../context/route';
import { LoadingSpinner, LoadingCard } from './LoadingSpinner';

// Example component showing how to use all the data fetching hooks
const ExampleDataUsage = () => {
    const { user } = useUser();
    const { posts, loading: postsLoading, error: postsError, createPost } = usePosts();
    const { businesses, loading: businessLoading, error: businessError } = useBusiness();
    const { sosRequests, loading: sosLoading, error: sosError } = useSOS();
    const { notifications, loading: notificationsLoading, error: notificationsError } = useNotifications();

    const handleCreatePost = async () => {
        const result = await createPost({
            title: 'Sample Post',
            description: 'This is a sample post',
            category: 'general',
            hasBusiness: false
        });

        if (result.success) {
            console.log('Post created successfully:', result.data);
        } else {
            console.error('Failed to create post:', result.error);
        }
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold">Data Fetching Examples</h1>

            {/* User Info */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">User Information</h2>
                {user ? (
                    <div>
                        <p><strong>Name:</strong> {user.fullname}</p>
                        <p><strong>Village:</strong> {user.village}</p>
                        <p><strong>Tourist Guide:</strong> {user.isTouristGuide ? 'Yes' : 'No'}</p>
                    </div>
                ) : (
                    <p>Not logged in</p>
                )}
            </div>

            {/* Posts */}
            <div className="bg-green-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Posts</h2>
                {postsLoading ? (
                    <LoadingCard message="Loading posts..." />
                ) : postsError ? (
                    <p className="text-red-600">Error: {postsError}</p>
                ) : (
                    <div>
                        <button
                            onClick={handleCreatePost}
                            className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Create Sample Post
                        </button>
                        <div className="space-y-2">
                            {posts.map(post => (
                                <div key={post._id} className="bg-white p-3 rounded border">
                                    <h3 className="font-semibold">{post.title}</h3>
                                    <p className="text-gray-600">{post.description}</p>
                                    <p className="text-sm text-gray-500">Category: {post.category}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Businesses */}
            <div className="bg-purple-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Businesses</h2>
                {businessLoading ? (
                    <LoadingCard message="Loading businesses..." />
                ) : businessError ? (
                    <p className="text-red-600">Error: {businessError}</p>
                ) : (
                    <div className="space-y-2">
                        {businesses.map(business => (
                            <div key={business._id} className="bg-white p-3 rounded border">
                                <h3 className="font-semibold">{business.name}</h3>
                                <p className="text-gray-600">{business.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* SOS Requests */}
            <div className="bg-red-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">SOS Requests</h2>
                {sosLoading ? (
                    <LoadingCard message="Loading SOS requests..." />
                ) : sosError ? (
                    <p className="text-red-600">Error: {sosError}</p>
                ) : (
                    <div className="space-y-2">
                        {sosRequests.map(sos => (
                            <div key={sos._id} className="bg-white p-3 rounded border border-red-200">
                                <h3 className="font-semibold text-red-800">{sos.title}</h3>
                                <p className="text-gray-600">{sos.description}</p>
                                <p className="text-sm text-red-600">Status: {sos.status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Notifications */}
            <div className="bg-yellow-50 p-4 rounded-lg">
                <h2 className="text-lg font-semibold mb-2">Notifications</h2>
                {notificationsLoading ? (
                    <LoadingCard message="Loading notifications..." />
                ) : notificationsError ? (
                    <p className="text-red-600">Error: {notificationsError}</p>
                ) : (
                    <div className="space-y-2">
                        {notifications.map(notification => (
                            <div key={notification._id} className="bg-white p-3 rounded border">
                                <h3 className="font-semibold">{notification.title}</h3>
                                <p className="text-gray-600">{notification.message}</p>
                                <p className="text-sm text-gray-500">
                                    Read: {notification.isRead ? 'Yes' : 'No'}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ExampleDataUsage;
