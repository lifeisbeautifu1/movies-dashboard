import { ImSpinner2 } from 'react-icons/im';

const Loader = () => {
  return (
    <div role='status'>
      <ImSpinner2 className='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' />
      <span className='sr-only'>Loading...</span>
    </div>
  );
};

export default Loader;
