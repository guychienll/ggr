import * as _ from 'lodash-es';
import * as React from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

type PaginationProps = {
    children: React.ReactNode;
    onNextPage: () => void;
    onPreviousPage: () => void;
};

const Pagination: React.FC<PaginationProps> = ({
    children,
    onNextPage,
    onPreviousPage,
}) => {
    return (
        <div className="items-center self-end hidden md:flex">
            <button
                onClick={_.debounce(() => {
                    onPreviousPage();
                }, 300)}
            >
                <IoIosArrowBack />
            </button>
            <span>{children}</span>
            <button
                onClick={_.debounce(() => {
                    onNextPage();
                }, 300)}
            >
                <IoIosArrowForward />
            </button>
        </div>
    );
};

export default Pagination;
