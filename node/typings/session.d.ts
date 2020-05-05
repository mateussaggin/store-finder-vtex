interface Session {
    namespaces?: {
        profile?: {
            id: {
                value: string
            }
            email: {
                value: string
            }
        }
        authentication?: {
            adminUserId: {
                value: string
            }
            adminUserEmail: {
                value: string
            }
        }
    }
}