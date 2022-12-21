interface Props {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: string | number;
  isError: boolean;
  className?: string;
  errorValue?: string;
  max?: string;
  min?: string;
  step?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormControl: React.FC<Props> = ({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  onFocus,
  isError,
  min,
  max,
  step,
  errorValue = 'Обязательное поле',
}) => {
  return (
    <div className='mt-4 flex flex-col gap-1 items-start'>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={`bg-[#ECF1F7] py-3 px-2 rounded-lg text-xs text-black/50 min-w-[325px] ${
          isError && 'bg-red-200 border border-red-300'
        }`}
        {...{ min, max, step }}
      />
      {isError && <p className='text-red-400 text-xs'>{errorValue}</p>}
    </div>
  );
};

export default FormControl;
