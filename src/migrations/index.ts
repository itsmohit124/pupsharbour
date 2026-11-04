import * as migration_20261104_035825_initial from './20261104_035825_initial';
import * as migration_20261104_040616_process_cta from './20261104_040616_process_cta';

export const migrations = [
  {
    up: migration_20261104_035825_initial.up,
    down: migration_20261104_035825_initial.down,
    name: '20261104_035825_initial',
  },
  {
    up: migration_20261104_040616_process_cta.up,
    down: migration_20261104_040616_process_cta.down,
    name: '20261104_040616_process_cta'
  },
];
