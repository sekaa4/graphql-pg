import DoneAllIcon from '@mui/icons-material/DoneAll';
import ReportIcon from '@mui/icons-material/Report';
import SearchIcon from '@mui/icons-material/Search';
import { Divider, Paper, TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/hooks';

import { getSearchBarInput } from '../model/selectors/getSearchBarInput/getSearchBarInput';
import { getSearchBarStatus } from '../model/selectors/getSearchBarStatus/getSearchBarStatus';
import { searchBarActions } from '../model/slice/searchBarSlice';

interface SearchBarProps {
  isError: boolean;
  isLoading: boolean;
}

export const SearchBar = (props: SearchBarProps) => {
  const { isError, isLoading } = props;
  const [searchValue, setSearchValue] = useState<string>('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation('common');
  const curSearchBarInput = useAppSelector(getSearchBarInput);
  const isValidAPI = useAppSelector(getSearchBarStatus);
  const isEqualValue = curSearchBarInput === searchValue;

  const handleClick = useCallback(() => {
    dispatch(searchBarActions.changeSearchBarInput(searchValue));
  }, [dispatch, searchValue]);
  return (
    <Paper component="div" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <TextField
        sx={{ ml: 1, flex: 1 }}
        variant="standard"
        size="small"
        label={
          (isError && isEqualValue && t('apiError')) ||
          (isValidAPI && isEqualValue && t('apiSuccess')) ||
          (isLoading && isEqualValue && t('apiLoading')) ||
          'API'
        }
        placeholder={(isError && t('apiPlaceholderError')) || t('apiPlaceholder')}
        inputProps={{ 'aria-label': 'api for documentation' }}
        value={searchValue}
        color={isValidAPI && isEqualValue ? 'success' : 'primary'}
        error={isError && isEqualValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
      {isValidAPI && !isError && isEqualValue && <DoneAllIcon color="success" />}
      {!isValidAPI && isError && isEqualValue && <ReportIcon color="error" />}

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handleClick}
        color="info"
        disabled={isEqualValue}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};