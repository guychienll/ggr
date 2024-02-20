type GetUserRequest = {
    limit: number;
    skip: number;
};

export type User = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    [key: string]: unknown;
};

export type GetUserResponse = {
    users: User[];
    total: number;
    [key: string]: unknown;
};

export const getUser: (
    props: GetUserRequest,
) => Promise<GetUserResponse> = async ({ limit, skip }) => {
    const response = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${skip}`,
    );
    return response.json();
};
