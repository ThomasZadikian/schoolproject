import Vue from 'vue'; 
import VueSqlite from 'vue-sqlite'; 

const db = new VueSqlite([
    databasePath: './database.sqlite'
]); 

Vue.use(VueSqlite, {db}); 

export default db; 