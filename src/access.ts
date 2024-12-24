/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.role === 'ADMIN',
    canDeveloper: currentUser && currentUser.role === 'DEVELOPER',
    canManager: currentUser && currentUser.role === 'MANAGER',
    canAdminAndManager: currentUser && (currentUser.role === "ADMIN" || currentUser.role === "MANAGER")
  };
}
