const BASE_URL = "https://blogsite-with-ai-summarize-feature.onrender.com";

export const api = {
    CreateBlog: `${BASE_URL}/form/new-blog`,
    login: `${BASE_URL}/auth/login`,
    signup: `${BASE_URL}/auth/signup`,
    sendOtp: `${BASE_URL}/auth/send-otp`,
    getPosts: `${BASE_URL}/get-posts`,
    getSummary: `${BASE_URL}/summarize`,
    getPost: (id) => `${BASE_URL}/posts/${id}`,
    getUser: (id) => `${BASE_URL}/user/${id}`,
    followUser: (id) => `${BASE_URL}/user/${id}/follow`,
    unfollowUser: (id) => `${BASE_URL}/user/${id}/unfollow`,
};
