import AuthModule from '../context/AuthContext';

function Profile() {
  const { currentUser } = AuthModule.useAuth();

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-3xl font-bold mb-6 text-dark">Welcome back, Manoj!</h2>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-xl font-bold mb-4">Account Details</h3>
        <p className="text-lg"><strong>Email:</strong> {currentUser?.email || ("")}</p>
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="text-xl font-bold mb-2">Order History</h3>
          <p className="text-slate-500">Your past orders will appear here soon.</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;