

export const isAdminOrSelf = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes('admin')) {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      }
    }
  }

  // Reject everyone else
  return false;
}


export const isAdminOrSelfOthers = ({ req: { user } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes('admin')) {
      return true;
    }

    // If any other type of user, only provide access to themselves
    return {
      createdBy: {
        equals: user.id,
      },
    }
  }

  // Reject everyone else
  return false;
}

export const canReadChat = ({ req: { user, query } }) => {
  // Need to be logged in
  if (user) {
    // If user has role of 'admin'
    if (user.roles?.includes('admin') || user.roles?.includes('user')) {
      return query
    }

    return false

  }

  // Reject everyone else
  return false;
}
