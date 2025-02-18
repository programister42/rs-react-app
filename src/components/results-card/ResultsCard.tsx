import cn from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router';
import { Book } from '../../api/models';
import { useSearchParamsString } from '../../hooks/useSearchParamsString';

interface ResultsCardProps {
  book: Book;
  className?: string;
}

export const ResultsCard: FC<ResultsCardProps> = ({ book, className }) => {
  const searchParamsString = useSearchParamsString();

  return (
    <NavLink
      to={`.${book.key}${searchParamsString}`}
      className={cn(
        'group flex py-4 cursor-pointer justify-between items-center',
        className
      )}
    >
      <div className="flex flex-col">
        <h3 className="text-sm/6 font-semibold text-gray-900 group-hover:text-indigo-600 group-[.active]:text-indigo-600">
          📖&nbsp;{book.title}
        </h3>
        {book.author_name && (
          <p className="mt-1 truncate text-xs/5 text-gray-500">
            {book.author_name.length > 1 ? '👥' : '👤'}&nbsp;
            {book.author_name.join(', ')}
          </p>
        )}
      </div>
      <span className="invisible text-lg group-hover:visible group-[.active]:visible">
        👉
      </span>
    </NavLink>
  );
};
