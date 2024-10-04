import { defineDb, defineTable, column } from 'astro:db';

const AuthLookup = defineTable({
  columns: {
    userName: column.text({ references: () => Curator.columns.userName }),
    provider: column.text(),
    login: column.text()
  }
})

const Curator = defineTable({
  columns: {
    userName: column.text({ primaryKey: true }),
    repository: column.text({ unique: true }),
  },
});

export default defineDb({
  tables: {
    AuthLookup,
    Curator
  }
});
