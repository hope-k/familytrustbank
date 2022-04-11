import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import authSlice from './Slices/authSlice';
import currentUserSlice from './Slices/currentUserSlice';
import accountsSlice from './Slices/accountsSlice';
import statsSlice from './Slices/statsSlice'
import transactionsSlice from './Slices/transactionsSlice'
import messagesSlice from './Slices/messagesSlice'
import transferSlice from './Slices/transferSlice';
import adminUsersSlice from './Slices/adminUsersSlice';
import adminTransactionsSlice from './Slices/adminTransactionsSlice';
import adminStatsSlice from './Slices/adminStatsSlice';
import adminAccountsSlice from './Slices/adminAccountsSlice';
import adminMessagesSlice from './Slices/adminMessagesSlice';

export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: currentUserSlice,
        accounts: accountsSlice,
        stats: statsSlice,
        transactions: transactionsSlice,
        messages: messagesSlice,
        transfer: transferSlice,
        users: adminUsersSlice,
        adminTransactions: adminTransactionsSlice,
        adminStat: adminStatsSlice,
        adminAccounts: adminAccountsSlice,
        adminMessage: adminMessagesSlice

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger)

})