import payload from 'payload'

export const hasDownloadAccess = async ({ req: { user } }) => {

    // Need to be logged in
    if (user) {
        // If user has role of 'admin'
        if (user.roles?.includes('admin')) {
            return true;
        }

        //     // If any other type of user, only provide access to themselves
        const purchasedItems = await payload.find({
            collection: "orders",
        });

        if (purchasedItems) {
            const items = purchasedItems.docs.map(item => {
                if (item.productinfo || item.productinfo2) {
                    return item.productinfo?.template || item.productinfo2?.template;
                } else {
                    return null;
                }
            });
            const accessIds = items.map(item => item ? item.id : null)
            return {
                id: {
                    in: accessIds,
                },
            }

        }

    }
    return false;
}
