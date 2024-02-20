import * as _ from 'lodash-es';
import * as React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type PaginationProps = {
    limitation: {
        min: number;
        max: number;
    };
    children: React.ReactNode;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination: React.FC<PaginationProps> = ({
    children,
    setPage,
    limitation,
}) => {
    const { min, max } = limitation;
    return (
        <div className="items-center self-end hidden md:flex">
            <button
                onClick={_.debounce(() => {
                    setPage((prev) => (prev <= min ? prev : prev - 1));
                }, 300)}
            >
                <IoIosArrowBack />
            </button>
            <span>{children}</span>
            <button
                onClick={_.debounce(() => {
                    setPage((prev) => (prev >= max ? prev : prev + 1));
                }, 300)}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
};

export default Pagination;
