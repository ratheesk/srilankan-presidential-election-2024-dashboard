import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import { GridRenderCellParams } from '@mui/x-data-grid';

export function renderAvatar(
  params: GridRenderCellParams<{ name: string; src: string }, any, any>
) {
  if (params.value == null) {
    return '';
  }

  return (
    <Avatar
      style={{ backgroundColor: params.value.color }}
      alt={params.value.name}
      src={params.value.src}
    />
  );
}
