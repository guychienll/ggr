import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { FixedSizeList as List, ListChildComponentProps } from 'react-window';
import { GetUserResponse, User, getUser } from '../../api/user';
import { useInViewport } from '../../hooks/window';
import Pagination from '../Pagination';
import Spinner from '../Spinner';

type UserItemProps = {
    user: User;
};

const UserItem = (props: UserItemProps) => {
    const { user } = props;
    return (
        <div className="flex flex-col px-2 py-4 rounded-md my-4 bg-[#9E434C] ">
            <div>
                {user.firstName} {user.lastName}
            </div>
            <div>{user.email}</div>
        </div>
    );
};

const ERROR_MESSAGE =
    'Oops ! Something bad happened!\nPlease try to reload page or contact customer service !';

export const Desktop: React.FC = () => {
    const LIMIT = 5;
    const [result, setResult] = useState<GetUserResponse>();
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [error, setError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                setResult(
                    await getUser({
                        limit: LIMIT,
                        skip: (page - 1) * LIMIT,
                    }),
                );
            } catch (e) {
                console.error(e);
                setError(ERROR_MESSAGE);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [LIMIT, page]);

    if (error) {
        return (
            <div className="p-8 flex flex-col">
                <pre>{error}</pre>
            </div>
        );
    }

    if (!result) {
        return null;
    }

    return (
        <div className="p-8 flex flex-col">
            <Pagination
                onNextPage={() => {
                    setPage((prev) =>
                        prev >= result.total / LIMIT ? prev : prev + 1,
                    );
                }}
                onPreviousPage={() => {
                    setPage((prev) => (prev <= 1 ? prev : prev - 1));
                }}
            >
                Page ( {page} / {result.total / LIMIT} )
            </Pagination>
            {result.users.map((user, index) => (
                <UserItem user={user} key={index} />
            ))}
            <div className="h-8">{isLoading ? <Spinner /> : null}</div>
            <Pagination
                onNextPage={() => {
                    setPage((prev) =>
                        prev >= result.total / LIMIT ? prev : prev + 1,
                    );
                }}
                onPreviousPage={() => {
                    setPage((prev) => (prev <= 1 ? prev : prev - 1));
                }}
            >
                Page ( {page} / {result.total / LIMIT} )
            </Pagination>
        </div>
    );
};

export const Mobile: React.FC = () => {
    const LIMIT = 8;
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<GetUserResponse>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const loadMore = useCallback(() => {
        if (!result || isLoading) {
            return;
        }
        setPage((prev) =>
            prev >= Math.ceil(result.total / LIMIT) ? prev : prev + 1,
        );
    }, [isLoading, result]);
    const ref = useInViewport(loadMore);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const result = await getUser({
                    limit: LIMIT,
                    skip: (page - 1) * LIMIT,
                });

                setResult((prev) => ({
                    ...result,
                    users: [...(prev ? prev.users : []), ...result.users],
                }));
            } catch (e) {
                console.error(e);
                setError(ERROR_MESSAGE);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [LIMIT, page]);

    if (error) {
        return (
            <div className="p-8 flex flex-col">
                <pre>{error}</pre>
            </div>
        );
    }

    if (!result) {
        return null;
    }

    return (
        <div className="p-8 flex flex-col">
            <List
                height={window.innerHeight}
                itemCount={result.users.length}
                itemSize={100}
                width="100%"
                className="virtual-list"
            >
                {({ index, style }: ListChildComponentProps) => {
                    return (
                        <div key={index} style={style}>
                            <UserItem user={result.users[index]} />
                            <div className="py-8" ref={ref}>
                                {isLoading ? <Spinner /> : null}
                            </div>
                        </div>
                    );
                }}
            </List>
        </div>
    );
};
