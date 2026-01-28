import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Mock Data matching your SQL Schema
  users: [
    { UserID: 1, FirstName: 'Rahul', LastName: 'Kumar', EmailAddress: 'rahul@player.com', UserTypeID: 3, AccountStatus: 'Active' },
    { UserID: 2, FirstName: 'Amit', LastName: 'Sharma', EmailAddress: 'amit@owner.com', UserTypeID: 2, AccountStatus: 'Active' }
  ],
  turfs: [
    { TurfID: 1, TurfName: 'Soccer City', City: 'Pune', TurfStatus: 'Inactive', Location: 'Kothrud' }
  ],
  bookings: [
    { BookingID: 101, TotalAmount: 1200.00, BookingStatus: 'Confirmed', PaymentStatus: 'Success' }
  ],
  stats: { totalRevenue: 85400, pendingApprovals: 5 },
  loading: false
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    toggleUserStatus: (state, action) => {
      const user = state.users.find(u => u.UserID === action.payload);
      if (user) user.AccountStatus = user.AccountStatus === 'Active' ? 'Suspended' : 'Active';
    },
    approveTurf: (state, action) => {
      const turf = state.turfs.find(t => t.TurfID === action.payload);
      if (turf) turf.TurfStatus = 'Active';
    }
  }
});

export const { toggleUserStatus, approveTurf } = adminSlice.actions;
export default adminSlice.reducer;