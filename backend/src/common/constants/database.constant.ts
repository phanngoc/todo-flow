/**
 * SQLite pragma commands
 */
export const SQLITE_PRAGMA = {
  /** Enable foreign key constraints */
  FOREIGN_KEYS_ON: 'foreign_keys = ON',
  /** Enable WAL journal mode */
  JOURNAL_MODE_WAL: 'journal_mode = WAL',
} as const;
