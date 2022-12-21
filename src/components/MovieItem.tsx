interface Props {
  id: string | number;
  active?: boolean;
  title: string;
  genres?: string[];
  year: number;
  onClick: () => void;
}

const MovieItem: React.FC<Props> = ({
  active = false,
  title,
  genres,
  year,
  onClick,
}) => {
  return (
    <li
      onClick={onClick}
      className={`bg-white hover:bg-[#EBF4FF] w-full shadow flex flex-col  rounded-lg px-4 py-2 cursor-pointer transition duration-300 ${
        active && 'border border-black/50 bg-[#fafafa]'
      }`}
    >
      <h2 className='text-black text-xs truncate'>{title}</h2>
      <p className='text-[#6C6C6C] text-[11px] hidden md:block'>
        <span>{year}</span>
        <span className='bg-black mx-3 w-[1px] h-full inline-block translate-y-[4px]'></span>
        <span>{genres ? genres?.join(', ') : 'Теги, по типу жанра'}</span>
      </p>
    </li>
  );
};

export default MovieItem;
