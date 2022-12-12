import { Theme, useTheme } from '@mui/material/styles';
import {
  Box,
  OutlinedInput,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Chip,
} from '@mui/material';

import { useAppSelector } from '../app/hooks';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, genres: readonly string[], theme: Theme) {
  return {
    fontWeight:
      genres.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  genres: string[];
  name?: string;
  error: boolean;
  setGenres: (value: string | string[]) => void;
  setErrors: React.Dispatch<
    React.SetStateAction<{
      title: boolean;
      year: boolean;
      plot: boolean;
      posterUrl: boolean;
      rate: boolean;
      actors: boolean;
      genres: boolean;
      runtime: boolean;
      director: boolean;
    }>
  >;
}

export const MultipleSelectChip: React.FC<Props> = ({
  genres,
  name,
  error,
  setGenres,
  setErrors,
}) => {
  const theme = useTheme();

  const { genres: genresList } = useAppSelector((state) => state.movies);

  const handleChange = (event: SelectChangeEvent<typeof genres>) => {
    const {
      target: { value },
    } = event;
    setGenres(value);
    setErrors((prevState) => ({
      ...prevState,
      // @ts-ignore
      [name]: false,
    }));
  };

  return (
    <FormControl
      className={`bg-[#ECF1F7] rounded ${
        error && 'bg-red-200 border border-red-300'
      }`}
    >
      <Select
        multiple
        placeholder='Жанры'
        value={genres}
        onChange={handleChange}
        input={<OutlinedInput placeholder='Жанры' label='Жанры' />}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {genresList.map((genre) => (
          <MenuItem
            key={genre}
            value={genre}
            style={getStyles(genre, genres, theme)}
          >
            {genre}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelectChip;
